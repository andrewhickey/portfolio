import * as React from 'react'
import * as Pixi from 'pixi.js'
import styled from 'styled-components'
import ScrollPosition from '../ScrollPosition'
import { color2, color3 } from '../../utils/colors'
import backgroundSrc from './lines.png'
import b2 from 'lucy-b2'
import { random } from 'lodash'

interface BackgroundProps {
  width: number
  height: number
}

// background-image: url('https://www.transparenttextures.com/patterns/light-paper-fibers.png'),
//   linear-gradient(to bottom, #d4e1f1, #dadada);
class Background extends React.Component<BackgroundProps> {
  pixiApp: Pixi.Application
  canvasRef = React.createRef<HTMLCanvasElement>()

  // Simulation
  then60: number
  interval60 = 1000 / 30
  then1: number
  interval1 = 1000 / 3
  velocityIterations = 1 // 6
  positionIterations = 1 // 2
  particleIterations = 2 // 8
  world: any
  ground: any
  particleSystem: any
  particles: Array<any> = []

  componentDidMount() {
    // Create world
    let gravity = new b2.Vec2(0, -9.8)
    this.world = new b2.World(gravity)

    let particleSystemDef = new b2.ParticleSystemDef()
    this.particleSystem = this.world.CreateParticleSystem(particleSystemDef)
    this.particleSystem.SetMaxParticleCount(100)

    // ground
    let groundBodyDef = new b2.BodyDef()
    groundBodyDef.position.Set(0.0, -10.0)
    this.ground = this.world.CreateBody(groundBodyDef)
    let groundBox = new b2.PolygonShape()
    groundBox.SetAsBox(50.0, 10.0)
    this.ground.CreateFixture(groundBox, 0.0)

    this._triggerParticles()
    this._runSimulation()
  }

  _createParticles = (particleSystem: any) => {
    const particleGroupShape = new b2.CircleShape()
    particleGroupShape.m_radius = 5
    particleGroupShape.m_p = new b2.Vec2(-5, 80)

    var xf = new b2.Transform()
    xf.SetIdentity()
    particleSystem.DestroyParticlesInShape(particleGroupShape, xf)

    const particleGroupDef = new b2.ParticleGroupDef()
    particleGroupDef.shape = particleGroupShape
    // particleGroupDef.angle = 1.0
    particleGroupDef.linearVelocity.Set(random(3, 7), 0)
    particleGroupDef.angularVelocity = -0.1
    // particleGroupDef.position.Set(0, 80)
    particleGroupDef.color.Set((0.5 * 255) / 5, 255 - (0.5 * 255) / 5, 128, 255)
    particleSystem.CreateParticleGroup(particleGroupDef)
  }

  _drawParticles = (context: CanvasRenderingContext2D, world: any) => {
    let particleSystem = world.GetParticleSystemList()

    while (particleSystem) {
      const particles = particleSystem.GetPositionBuffer()
      const colors = particleSystem.GetColorBuffer()
      let maxParticles = particles.length

      for (let i = 0, c = 0; i < maxParticles; i++, c += 2) {
        if (particles[i]) {
          const x = this._getX(particles[i].x)
          const y = this._getY(particles[i].y)
          const color = colors[i]
          context.fillStyle = 'blue'
          context.moveTo(x, y)
          context.arc(x, y, 5, 0, Math.PI * 2, true)
        }
      }

      particleSystem = particleSystem.GetNext()
    }
  }

  _drawWorld = () => {
    const canvas = this.canvasRef.current
    const context = canvas.getContext('2d', { alpha: false })

    // clear canvas
    context.clearRect(0, 0, canvas.width, canvas.height)
    context.beginPath()

    this._drawParticles(context, this.world)

    context.fill()
  }

  _triggerParticles = () => {
    requestAnimationFrame(this._triggerParticles)

    // lock fps
    if (!this.then1) this.then1 = Date.now()
    const now = Date.now()
    const delta = now - this.then1

    if (delta > this.interval1) {
      this.then1 = now - (delta % this.interval1)

      this._createParticles(this.particleSystem)
    }
  }

  _runSimulation = () => {
    requestAnimationFrame(this._runSimulation)

    // lock fps
    if (!this.then60) this.then60 = Date.now()
    const now = Date.now()
    const delta = now - this.then60

    if (delta > this.interval60) {
      this.then60 = now - (delta % this.interval60)

      // liquidFun needs a consistent timestep
      // so we use interval instead of deltatime
      // it's a good enough approximation
      this.world.Step(
        0.032,
        this.velocityIterations,
        this.positionIterations,
        this.particleIterations
      )

      this._drawWorld()
    }
  }

  _getX = (x: number) => (x / 100) * this.props.width
  _getY = (y: number) => this.props.height - (y / 100) * this.props.height

  render() {
    const { width, height } = this.props
    return (
      <canvas
        width={width}
        height={height}
        style={{
          zIndex: -1,
          position: 'fixed',
        }}
        ref={this.canvasRef}
      />
    )
  }
}

export default Background
