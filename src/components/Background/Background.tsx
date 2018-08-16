import * as React from 'react'
import * as Pixi from 'pixi.js'
import b2 from 'lucy-b2'
import { random } from 'lodash'
import { withPrefix } from 'gatsby-link'

interface BackgroundProps {
  width: number
  height: number
}

// TODO https://github.com/pixijs/pixi-filters displacement filter
// background-image: url('https://www.transparenttextures.com/patterns/light-paper-fibers.png'),
//   linear-gradient(to bottom, #d4e1f1, #dadada);
class Background extends React.Component<BackgroundProps> {
  pixiApp: Pixi.Application
  pixiParticles: Array<Pixi.Sprite> = []
  canvasRef = React.createRef<HTMLCanvasElement>()

  // Simulation
  then60: number
  interval60 = 1000 / 60
  then1: number
  interval1 = 1000 / 4
  velocityIterations = 1 // 6
  positionIterations = 1 // 2
  particleIterations = 2 // 8
  particleCount = 1000
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
    this.particleSystem.SetMaxParticleCount(this.particleCount)

    // ground
    let groundBodyDef = new b2.BodyDef()
    groundBodyDef.position.Set(0.0, -10.0)
    this.ground = this.world.CreateBody(groundBodyDef)
    let groundBox = new b2.PolygonShape()
    groundBox.SetAsBox(50.0, 10.0)
    this.ground.CreateFixture(groundBox, 0.0)

    // set up Pixi
    this.pixiApp = new Pixi.Application(this.props.width, this.props.height, {
      view: this.canvasRef.current,
      backgroundColor: 0xffffff,
    })

    const pixiParticleContainer = new Pixi.particles.ParticleContainer(
      this.particleCount
    )
    this.pixiApp.stage.addChild(pixiParticleContainer)

    const graphic = new PIXI.Graphics()
    graphic.beginFill(0xff00ff, 1)
    graphic.drawRect(0, 0, 20, 20)
    const texture = this.pixiApp.renderer.generateTexture(graphic)
    for (let i = 0; i < this.particleCount; i++) {
      // let sprite = Pixi.Sprite.fromImage(withPrefix('bubble.png'))
      const pixiParticle = new PIXI.Sprite(texture)
      pixiParticle.x = -100
      pixiParticle.y = -100
      pixiParticleContainer.addChild(pixiParticle)
      this.pixiParticles.push(pixiParticle)
    }

    this._triggerParticles()
    this.pixiApp.ticker.add(this._runSimulation)
  }

  _createParticles = (particleSystem: any) => {
    const particleGroupShape = new b2.CircleShape()
    particleGroupShape.m_radius = 5
    particleGroupShape.m_p = new b2.Vec2(50, 110) // position

    var xf = new b2.Transform()
    xf.SetIdentity()
    particleSystem.DestroyParticlesInShape(particleGroupShape, xf)

    const particleGroupDef = new b2.ParticleGroupDef()
    particleGroupDef.shape = particleGroupShape
    // particleGroupDef.angle = 1.0
    // random(-5, -15)
    particleGroupDef.linearVelocity.Set(0, -8)
    // particleGroupDef.angularVelocity = -0.1
    // particleGroupDef.position.Set(0, 80)
    particleGroupDef.color.Set((0.5 * 255) / 5, 255 - (0.5 * 255) / 5, 128, 255)
    particleSystem.CreateParticleGroup(particleGroupDef)
  }

  _drawParticles = (world: any) => {
    let particleSystem = world.GetParticleSystemList()

    while (particleSystem) {
      const particles = particleSystem.GetPositionBuffer()
      const colors = particleSystem.GetColorBuffer()
      let maxParticles = particles.length

      for (let i = 0; i < maxParticles; i++) {
        if (particles[i]) {
          const x = this._getX(particles[i].x)
          const y = this._getY(particles[i].y)
          const color = colors[i]
          if (!this.pixiParticles[i]) console.log({ i, maxParticles })
          this.pixiParticles[i].x = x
          this.pixiParticles[i].y = y
        }
      }

      particleSystem = particleSystem.GetNext()
    }
  }

  _drawWorld = () => {
    // clear canvas
    this._drawParticles(this.world)
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
        0.016,
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
