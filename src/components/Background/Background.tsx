import * as React from 'react'
import * as Pixi from 'pixi.js'
import styled from 'styled-components'
import ScrollPosition from '../ScrollPosition'
import { color2, color3 } from '../../utils/colors'
import backgroundSrc from './lines.png'
import b2 from 'lucy-b2'

const inv255 = 0.003921569

// background-image: url('https://www.transparenttextures.com/patterns/light-paper-fibers.png'),
//   linear-gradient(to bottom, #d4e1f1, #dadada);
interface BackgroundState {
  windowWidth: number
  windowHeight: number
}
class Background extends React.Component {
  state: BackgroundState = {
    windowWidth: window.innerWidth,
    windowHeight: window.innerHeight,
  }

  pixiApp: Pixi.Application
  startTime: number
  canvasRef = React.createRef<HTMLCanvasElement>()

  // Simulation
  velocityIterations = 6
  positionIterations = 2
  world: any
  ground: any
  particleSystem: any
  particles: Array<any> = []

  _storeWindowSize = () => {
    const windowWidth = window.innerWidth
    const windowHeight = window.innerHeight

    this.setState({
      windowWidth,
      windowHeight,
    })
  }

  componentDidMount() {
    window.addEventListener('resize', this._storeWindowSize)

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
    particleDef.flags = b2.elasticParticle
    particleDef.color.Set(0, 0, 255, 255)

    for (let index = 0; index < 50; index++) {
      particleDef.position.Set(index * 2, 0)
      this.particleSystem.CreateParticle(particleDef)
    }

    this.pixiApp = new PIXI.Application({
      width: this.state.windowWidth,
      height: this.state.windowHeight,
      view: this.canvasRef.current,
      transparent: true,
    })

    let particles = this.particleSystem.GetPositionBuffer()
    let color = this.particleSystem.GetColorBuffer()
    let maxParticles = particles.length

    // let transform = new b2.Transform();
    // transform.SetIdentity();

    for (let i = 0, c = 0; i < maxParticles; i++, c += 4) {
      if (particles[i]) {
        const pixiParticle = this._drawParticle(
          this._getX(this.particleSystem.GetRadius()),
          this._getX(particles[i].x),
          this._getY(particles[i].y),
          color[c] * inv255,
          color[c + 1] * inv255,
          color[c + 2] * inv255
        )
        this.pixiApp.stage.addChild(pixiParticle)
      }
    }

    this.pixiApp.ticker.add(this._runSimulation)
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this._storeWindowSize)
  }

  _drawParticle = (
    radius: number,
    x: number,
    y: number,
    r: number,
    g: number,
    b: number
  ) => {
    let circle = new Pixi.Graphics()
    circle.beginFill(0x9966ff)
    circle.drawCircle(x, y, radius)
    circle.endFill()
    return circle
  }

  _drawWorld = () => {
    let particles = this.particleSystem.GetPositionBuffer()
    let maxParticles = particles.length

    for (let i = 0, c = 0; i < maxParticles; i++, c += 2) {
      if (particles[i]) {
        const pixiParticle = this.pixiApp.stage.getChildAt(i)
        pixiParticle.x = this._getX(particles[i].x)
        pixiParticle.y = this._getY(particles[i].y)
      }
    }
  }

  _runSimulation = (deltaTime: number) => {
    this.world.Step(
      deltaTime / 100,
      this.velocityIterations,
      this.positionIterations
    )

    this._drawWorld()
  }

  _getX = (x: number) => (x / 100) * this.state.windowWidth
  _getY = (y: number) => (y / 100) * this.state.windowHeight

  render() {
    const { windowHeight, windowWidth } = this.state
    return (
      <canvas
        width={windowWidth}
        height={windowHeight}
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
