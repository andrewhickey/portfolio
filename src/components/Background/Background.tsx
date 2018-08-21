import * as React from 'react'
import * as Pixi from 'pixi.js'
import b2 from 'lucy-b2'
import { random } from 'lodash'
import { Obstacles, Point } from '../../context/AquariumContext'

interface BackgroundProps {
  width: number
  height: number
  obstacles: Obstacles
  triggerPoint: Point
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
  velocityIterations = 1 // docs default 6
  positionIterations = 1 // docs default 2
  particleIterations = 1 // docs default 8
  particleCount = 100
  world: any
  particleSystem: any
  obstacleBodies: Map<string, any> = new Map()

  _getWorldX = (x: number) => (x / this.props.width) * 100
  _getWorldY = (y: number) => (y / this.props.height) * 100

  _updateObstacles = (obstacles: Obstacles, world: any) => {
    obstacles.forEach((obstacle, key) => {
      let obstacleBody = this.obstacleBodies.get(key)
      const centerX = obstacle.x + obstacle.width / 2
      const centerY = obstacle.y + obstacle.height / 2
      const worldX = this._getWorldX(centerX)
      const worldY = 100 - this._getWorldY(centerY)
      const worldWidth = this._getWorldX(obstacle.width)
      const worldHeight = this._getWorldY(obstacle.height)

      if (!obstacleBody) {
        const obstacleBodyDef = new b2.BodyDef()
        obstacleBodyDef.position.Set(0, 0)
        obstacleBody = world.CreateBody(obstacleBodyDef)
      }

      // to change the size of an existing body we have to destroy and re-create its fixture
      let existingFixture = obstacleBody.GetFixtureList()
      while (existingFixture) {
        obstacleBody.DestroyFixture(existingFixture)
        existingFixture = existingFixture.GetNext()
      }
      const obstacleFixture = new b2.PolygonShape()
      obstacleFixture.SetAsBox(worldWidth / 2, worldHeight / 2)
      obstacleBody.CreateFixture(obstacleFixture, 0.0)
      obstacleBody.SetTransform(worldX, worldY, 0)
      this.obstacleBodies.set(key, obstacleBody)
    })
  }

  componentDidUpdate() {
    this._updateObstacles(this.props.obstacles, this.world)
  }

  componentDidMount() {
    // Create world
    let gravity = new b2.Vec2(0, -29.8)
    this.world = new b2.World(gravity)

    let particleSystemDef = new b2.ParticleSystemDef()
    this.particleSystem = this.world.CreateParticleSystem(particleSystemDef)
    this.particleSystem.SetMaxParticleCount(this.particleCount)

    // set up Pixi
    this.pixiApp = new Pixi.Application(this.props.width, this.props.height, {
      view: this.canvasRef.current,
      transparent: true,
    })

    // create array of re-usable particles
    const pixiParticleContainer = new Pixi.particles.ParticleContainer(
      this.particleCount
    )
    this.pixiApp.stage.addChild(pixiParticleContainer)

    const graphic = new PIXI.Graphics()
    graphic.beginFill(0x44ccff, 0.5)
    graphic.drawCircle(5, 5, 7)
    const texture = this.pixiApp.renderer.generateTexture(graphic)

    for (let i = 0; i < this.particleSystem.GetPositionBuffer().length; i++) {
      const pixiParticle = new PIXI.Sprite(texture)
      pixiParticle.x = -100
      pixiParticle.y = -100
      pixiParticleContainer.addChild(pixiParticle)
      this.pixiParticles.push(pixiParticle)
    }

    // this._triggerParticles() // adds new particles to the world 3 times a second
    this.pixiApp.ticker.add(this._runSimulation)
    this._triggerParticles()
  }

  _createParticles = (particleSystem: any) => {
    const { triggerPoint } = this.props

    if (triggerPoint) {
      const worldX = this._getWorldX(triggerPoint.x)
      const worldY = 100 - this._getWorldY(triggerPoint.y)
      const particleDef = new b2.ParticleDef()
      particleDef.position.Set(worldX, worldY)
      particleDef.velocity.Set(random(-5, 5), random(5, 15))
      // particleDef.lifetime = 2 // measured in seconds
      particleSystem.CreateParticle(particleDef)
    }
  }

  _drawParticles = (world: any) => {
    let particleSystem = world.GetParticleSystemList()

    while (particleSystem) {
      const particles = particleSystem.GetPositionBuffer()
      let maxParticles = particles.length

      for (let i = 0; i < maxParticles; i++) {
        const flag = particleSystem.GetParticleFlags(i)
        if (particles[i]) {
          if (flag === b2.ParticleFlag.zombieParticle) {
            this.pixiParticles[i].x = -100
            this.pixiParticles[i].y = -100
          } else {
            const x = this._getX(particles[i].x)
            const y = this._getY(particles[i].y)
            this.pixiParticles[i].x = x
            this.pixiParticles[i].y = y
          }
        } else {
          this.pixiParticles[i].x = -100
          this.pixiParticles[i].y = -100
        }
      }

      particleSystem = particleSystem.GetNext()
    }
  }

  _drawWorld = () => {
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
        1 / 60,
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
          zIndex: 2,
          position: 'fixed',
          pointerEvents: 'none',
        }}
        ref={this.canvasRef}
      />
    )
  }
}

export default Background
