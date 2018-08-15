import * as React from 'react'
import * as Pixi from 'pixi.js'
import styled from 'styled-components'
import ScrollPosition from '../ScrollPosition'
import { color2, color3 } from '../../utils/colors'
import backgroundSrc from './lines.png'
import b2 from 'lucy-b2'

const inv255 = 0.003921569

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
  fps = 60
  then: number
  interval = 1000 / this.fps
  velocityIterations = 6
  positionIterations = 2
  particleIterations = 8
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

    // ground
    let groundBodyDef = new b2.BodyDef()
    groundBodyDef.position.Set(0.0, -10.0)
    this.ground = this.world.CreateBody(groundBodyDef)
    let groundBox = new b2.PolygonShape()
    groundBox.SetAsBox(50.0, 10.0)
    this.ground.CreateFixture(groundBox, 0.0)

    // water particles
    let particleDef = new b2.ParticleDef()
    // particleDef.flags = b2.elasticParticle
    particleDef.color.Set(0, 0, 255, 255)

    for (let index = 0; index < 50; index++) {
      particleDef.position.Set(index * 2, 50)
      this.particleSystem.CreateParticle(particleDef)
    }

    this._runSimulation()
  }

  _drawParticles = (context: CanvasRenderingContext2D, world: any) => {
    let particleSystem = world.GetParticleSystemList()

    while (particleSystem) {
      let particles = particleSystem.GetPositionBuffer()
      let maxParticles = particles.length

      for (let i = 0, c = 0; i < maxParticles; i++, c += 2) {
        if (particles[i]) {
          const x = this._getX(particles[i].x)
          const y = this._getY(particles[i].y)

          context.moveTo(x, y)
          context.arc(x, y, 5, 0, Math.PI * 2, true)
        }
      }

      particleSystem = particleSystem.GetNext()
    }
  }

  _drawWorld = () => {
    const canvas = this.canvasRef.current
    const context = canvas.getContext('2d')

    // clear canvas
    context.clearRect(0, 0, canvas.width, canvas.height)
    context.beginPath()

    this._drawParticles(context, this.world)

    context.fill()
  }

  _runSimulation = () => {
    requestAnimationFrame(this._runSimulation)

    // lock fps
    if (!this.then) this.then = Date.now()
    const now = Date.now()
    const delta = now - this.then

    if (delta > this.interval) {
      this.then = now - (delta % this.interval)

      // liquidFun needs a consistent timestep
      // so we use interval instead of deltatime
      // it's a good enough approximation
      this.world.Step(
        this.interval / 1000,
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
