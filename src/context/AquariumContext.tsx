import * as React from 'react'
import { Component, createContext } from 'react'
import { random, range } from 'lodash'
import { Point, line } from '../utils/lines'

interface Snake extends Point {
  angle: number
}
interface AquariumState {
  snakes: Snake[]
  updatePoint: (point: Point) => void
  windowWidth: number
  windowHeight: number
}
const AquariumContext = createContext<AquariumState>({
  snakes: [],
  updatePoint: () => {},
  windowWidth: window.innerWidth,
  windowHeight: window.innerHeight,
})

interface AquariumControllerProps {
  children: React.ReactNode
}
interface AquariumControllerState {
  mouseX: number
  mouseY: number
  interestPoint?: Point
  contextState: AquariumState
}

const maxDirectionChange = Math.PI / 8
const speed = 40

class AquariumController extends Component<AquariumControllerProps> {
  updateHandle: NodeJS.Timer

  componentDidMount() {
    window.addEventListener('resize', this._storeWindowSize)
    window.addEventListener('mousemove', this._handleMouseMove)
    window.addEventListener('touchmove', this._handleTouchMove)
    this.updateHandle = setInterval(this._moveSnakes, 200)
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this._storeWindowSize)
    window.removeEventListener('mousemove', this._handleMouseMove)
    window.removeEventListener('touchmove', this._handleMouseMove)
    clearInterval(this.updateHandle)
  }

  _storeWindowSize() {
    const windowWidth = window.innerWidth
    const windowHeight = window.innerHeight

    this.setState({
      contextState: {
        ...this.state.contextState,
        windowWidth,
        windowHeight,
      },
    })
  }

  _handleMouseMove = ({ pageX, pageY }: MouseEvent) => {
    this._setMousePosition(pageX, pageY)
  }

  _handleTouchMove = ({ touches }: TouchEvent) => {
    this._setMousePosition(touches[0].pageX, touches[0].pageY)
  }

  _setMousePosition = (mouseX: number, mouseY: number) => {
    this.setState({ mouseX, mouseY })
  }

  _updatePoint = (point: Point) => {
    this.setState({ interestPoint: point })
  }

  _moveSnake = (snake: Snake) => {
    const { interestPoint } = this.state
    let angle
    if (interestPoint) {
      const lineToInterest = line(snake, interestPoint)
      angle =
        lineToInterest.angle + random(-maxDirectionChange, maxDirectionChange)
    } else {
      angle = snake.angle + random(-maxDirectionChange, maxDirectionChange)
    }
    const x = snake.x + Math.cos(angle) * speed
    const y = snake.y + Math.sin(angle) * speed

    const outOfHoriztontalBounds =
      x < 0 || x > this.state.contextState.windowWidth
    const outOfVerticalBounds =
      y < 0 || y > this.state.contextState.windowHeight
    if (outOfHoriztontalBounds || outOfVerticalBounds) {
      return {
        x: snake.x + Math.cos(angle + Math.PI) * speed,
        y: snake.y + Math.sin(angle + Math.PI) * speed,
        angle: angle + Math.PI,
      }
    }

    return { x, y, angle }
  }

  _moveSnakes = () => {
    const snakes = this.state.contextState.snakes
    const nextSnakes = snakes.map(this._moveSnake)

    this.setState({
      contextState: {
        ...this.state.contextState,
        snakes: nextSnakes,
      },
    })
  }

  state: AquariumControllerState = {
    mouseX: window.innerWidth / 2,
    mouseY: window.innerHeight / 2,
    interestPoint: null,
    contextState: {
      windowWidth: window.innerWidth,
      windowHeight: window.innerHeight,
      snakes: range(10).map(() => ({
        x: random(200, 800),
        y: random(200, 800),
        angle: random(Math.PI),
      })),
      updatePoint: this._updatePoint,
    },
  }

  render() {
    const { children } = this.props

    return (
      <AquariumContext.Provider value={this.state.contextState}>
        {children}
      </AquariumContext.Provider>
    )
  }
}

export { AquariumContext, AquariumController }
