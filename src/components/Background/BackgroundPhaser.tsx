import * as React from 'react'
import * as Phaser from 'phaser'
import { random } from 'lodash'
import { withPrefix } from 'gatsby'
import { Obstacles, Point } from '../../context/AquariumContext'

interface BackgroundProps {
  width: number
  height: number
  obstacles: Obstacles
  triggerPoint: Point
}

// const proton = new Proton()
// const emitter = new Proton.Emitter()
// const attractionBehaviour = new.Proton.Attraction(new Proton.Vector2D())

function createGame(width: number, height: number, canvas: HTMLCanvasElement) {
  return new Promise<{
    pointEmitter: Phaser.GameObjects.Particles.ParticleEmitter
    foregroundEmitter: Phaser.GameObjects.Particles.ParticleEmitter
    // backgroundEmitter: Phaser.GameObjects.Particles.ParticleEmitter
  }>(resolve => {
    function preload() {
      this.load.spritesheet('snowflakes', withPrefix('snowflakes.png'), {
        frameWidth: 17,
        frameHeight: 17,
      })
      this.load.spritesheet(
        'snowflakes_large',
        withPrefix('snowflakes_large.png'),
        {
          frameWidth: 64,
          frameHeight: 64,
        }
      )
    }

    function create() {
      const smallParticles = this.add.particles('snowflakes', [
        0,
        1,
        2,
        3,
        4,
        5,
      ])
      // const largeParticles = this.add.particles('snowflakes_large', [
      //   0,
      //   1,
      //   2,
      //   3,
      //   4,
      //   5,
      // ])

      const pointEmitter: Phaser.GameObjects.Particles.ParticleEmitter = smallParticles.createEmitter(
        {
          speed: 100,
          gravityY: 100,
          lifespan: 4000,
          // scale: { start: 1, end: 0 },
          blendMode: 'ADD',
        }
      )

      const foregroundEmitter: Phaser.GameObjects.Particles.ParticleEmitter = smallParticles.createEmitter(
        {
          x: { min: 0, max: width },
          y: -20,
          speed: 100,
          gravityY: 100,
          lifespan: 4000,
          // scale: { start: 1, end: 0 },
          blendMode: 'ADD',
        }
      )

      // const backgroundEmitter: Phaser.GameObjects.Particles.ParticleEmitter = largeParticles.createEmitter(
      //   {
      //     speed: 100,
      //     gravityY: 200,
      //     lifespan: 4000,
      //     // scale: { start: 1, end: 0 },
      //     blendMode: 'ADD',
      //     emitZone: { source: topEdge },
      //   }
      // )

      resolve({ pointEmitter, foregroundEmitter })
    }

    const config = {
      type: Phaser.WEBGL,
      width: width,
      height: height,
      canvas: canvas,
      render: {
        transparent: true,
      },
      scene: {
        preload: preload,
        create: create,
      },
    }

    const game = new Phaser.Game(config)
  })
}

class Background extends React.Component<BackgroundProps> {
  pointEmitter: Phaser.GameObjects.Particles.ParticleEmitter
  foregroundEmitter: Phaser.GameObjects.Particles.ParticleEmitter
  backgroundEmitter: Phaser.GameObjects.Particles.ParticleEmitter
  game: Phaser.Game
  canvasRef = React.createRef<HTMLCanvasElement>()

  async componentDidMount() {
    const { width, height } = this.props

    const {
      pointEmitter,
      foregroundEmitter,
      // backgroundEmitter,
    } = await createGame(width, height, this.canvasRef.current)

    this.pointEmitter = pointEmitter
    this.foregroundEmitter = foregroundEmitter
    // this.backgroundEmitter = backgroundEmitter
  }

  triggerParticles = (prevProps: BackgroundProps) => {
    const { triggerPoint: prevTriggerPoint } = prevProps
    const { triggerPoint } = this.props

    if (this.pointEmitter) {
      if (triggerPoint)
        this.pointEmitter.setPosition(triggerPoint.x, triggerPoint.y)

      const triggerStarted = !prevTriggerPoint && triggerPoint
      if (triggerStarted) this.pointEmitter.start()

      const triggerStopped = prevTriggerPoint && !triggerPoint
      if (triggerStopped) this.pointEmitter.stop()
    }
  }

  componentDidUpdate(prevProps: BackgroundProps) {
    this.triggerParticles(prevProps)
  }

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

// pixiApp: Pixi.Application
//   pixiParticles: Array<Pixi.Sprite> = []
//   canvasRef = React.createRef<HTMLCanvasElement>()
//   proton: any

//   _getWorldX = (x: number) => (x / this.props.width) * 100
//   _getWorldY = (y: number) => (y / this.props.height) * 100

//   _updateObstacles = (obstacles: Obstacles, world: any) => {
//     obstacles.forEach((obstacle, key) => {
//       let obstacleBody = this.obstacleBodies.get(key)
//       const centerX = obstacle.x + obstacle.width / 2
//       const centerY = obstacle.y + obstacle.height / 2
//       const worldX = this._getWorldX(centerX)
//       const worldY = 100 - this._getWorldY(centerY)
//       const worldWidth = this._getWorldX(obstacle.width)
//       const worldHeight = this._getWorldY(obstacle.height)

//       if (!obstacleBody) {
//         const obstacleBodyDef = new b2.BodyDef()
//         obstacleBodyDef.position.Set(0, 0)
//         obstacleBody = world.CreateBody(obstacleBodyDef)
//       }

//       // to change the size of an existing body we have to destroy and re-create its fixture
//       let existingFixture = obstacleBody.GetFixtureList()
//       while (existingFixture) {
//         obstacleBody.DestroyFixture(existingFixture)
//         existingFixture = existingFixture.GetNext()
//       }
//       const obstacleFixture = new b2.PolygonShape()
//       obstacleFixture.SetAsBox(worldWidth / 2, worldHeight / 2)
//       obstacleBody.CreateFixture(obstacleFixture, 0.0)
//       obstacleBody.SetTransform(worldX, worldY, 0)
//       this.obstacleBodies.set(key, obstacleBody)
//     })
//   }

//   componentDidUpdate() {
//     this._updateObstacles(this.props.obstacles, this.world)
//   }

//   componentDidMount() {
//     // Create world
//     let gravity = new b2.Vec2(0, -29.8)
//     this.world = new b2.World(gravity)

//     let particleSystemDef = new b2.ParticleSystemDef()
//     this.particleSystem = this.world.CreateParticleSystem(particleSystemDef)
//     this.particleSystem.SetMaxParticleCount(this.particleCount)

//     // set up Pixi
//     this.pixiApp = new Pixi.Application(this.props.width, this.props.height, {
//       view: this.canvasRef.current,
//       transparent: true,
//     })

//     // create array of re-usable particles
//     const pixiParticleContainer = new Pixi.particles.ParticleContainer(
//       this.particleCount
//     )
//     this.pixiApp.stage.addChild(pixiParticleContainer)

//     const graphic = new PIXI.Graphics()
//     graphic.beginFill(0x44ccff, 0.5)
//     graphic.drawCircle(5, 5, 7)
//     const texture = this.pixiApp.renderer.generateTexture(graphic)

//     for (let i = 0; i < this.particleSystem.GetPositionBuffer().length; i++) {
//       const pixiParticle = new PIXI.Sprite(texture)
//       pixiParticle.x = -100
//       pixiParticle.y = -100
//       pixiParticleContainer.addChild(pixiParticle)
//       this.pixiParticles.push(pixiParticle)
//     }

//     // this._triggerParticles() // adds new particles to the world 3 times a second
//     this.pixiApp.ticker.add(this._runSimulation)
//     this._triggerParticles()
//   }

//   _createParticles = (particleSystem: any) => {
//     const { triggerPoint } = this.props

//     if (triggerPoint) {
//       const worldX = this._getWorldX(triggerPoint.x)
//       const worldY = 100 - this._getWorldY(triggerPoint.y)
//       const particleDef = new b2.ParticleDef()
//       particleDef.position.Set(worldX, worldY)
//       particleDef.velocity.Set(random(-5, 5), random(5, 15))
//       // particleDef.lifetime = 2 // measured in seconds
//       particleSystem.CreateParticle(particleDef)
//     }
//   }

//   _drawParticles = (world: any) => {
//     let particleSystem = world.GetParticleSystemList()

//     while (particleSystem) {
//       const particles = particleSystem.GetPositionBuffer()
//       let maxParticles = particles.length

//       for (let i = 0; i < maxParticles; i++) {
//         const flag = particleSystem.GetParticleFlags(i)
//         if (particles[i]) {
//           if (flag === b2.ParticleFlag.zombieParticle) {
//             this.pixiParticles[i].x = -100
//             this.pixiParticles[i].y = -100
//           } else {
//             const x = this._getX(particles[i].x)
//             const y = this._getY(particles[i].y)
//             this.pixiParticles[i].x = x
//             this.pixiParticles[i].y = y
//           }
//         } else {
//           this.pixiParticles[i].x = -100
//           this.pixiParticles[i].y = -100
//         }
//       }

//       particleSystem = particleSystem.GetNext()
//     }
//   }

//   _drawWorld = () => {
//     this._drawParticles(this.world)
//   }

//   _triggerParticles = () => {
//     requestAnimationFrame(this._triggerParticles)

//     // lock fps
//     if (!this.then1) this.then1 = Date.now()
//     const now = Date.now()
//     const delta = now - this.then1

//     if (delta > this.interval1) {
//       this.then1 = now - (delta % this.interval1)

//       this._createParticles(this.particleSystem)
//     }
//   }

//   _runSimulation = () => {
//     // lock fps
//     if (!this.then60) this.then60 = Date.now()
//     const now = Date.now()
//     const delta = now - this.then60

//     if (delta > this.interval60) {
//       this.then60 = now - (delta % this.interval60)
//       // liquidFun needs a consistent timestep
//       // so we use interval instead of deltatime
//       // it's a good enough approximation
//       this.world.Step(
//         1 / 60,
//         this.velocityIterations,
//         this.positionIterations,
//         this.particleIterations
//       )

//       this._drawWorld()
//     }
//   }

//   _getX = (x: number) => (x / 100) * this.props.width
//   _getY = (y: number) => this.props.height - (y / 100) * this.props.height
