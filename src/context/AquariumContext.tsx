import * as React from 'react'
import { Component, createContext } from 'react'
import { random, range } from 'lodash'
import { Point, normaliseVector, length } from '../utils/lines'

interface Snake extends Point {
  vector: Point
}
interface InterestPoint extends Point {
  weight: number
}

interface AquariumState {
  snakes: Snake[]
  updatePoint: (point: InterestPoint) => void
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
  interestPoint?: InterestPoint
  controlled: boolean
  contextState: AquariumState
}

const maxRotation = Math.PI / 8
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

  _storeWindowSize = () => {
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
    if (!this.state.controlled) {
      const interestPoint = { x: mouseX, y: mouseY, weight: 0.1 }
      this.setState({ interestPoint })
    }
  }

  _updatePoint = (point: InterestPoint) => {
    this.setState({ interestPoint: point, controlled: !!point })
  }

  _moveSnake = (snake: Snake, index: number) => {
    const { interestPoint, contextState } = this.state

    let vector
    if (interestPoint) {
      const interestVector = {
        x: interestPoint.x - snake.x,
        y: interestPoint.y - snake.y,
      }

      const vectorDistance = Math.abs(
        length(interestVector.x, interestVector.y)
      )

      const screenDistance =
        length(contextState.windowWidth, contextState.windowHeight) / 4

      // adjust weight based on distance, further away items are less interesting
      const closenessFactor = 1 - Math.abs(vectorDistance / screenDistance)
      const adjustedWeight = interestPoint.weight * Math.max(closenessFactor, 0)

      const normalisedVector = normaliseVector(interestVector)

      const x =
        snake.vector.x * (1 - adjustedWeight) +
        normalisedVector.x * adjustedWeight
      const y =
        snake.vector.y * (1 - adjustedWeight) +
        normalisedVector.y * adjustedWeight

      vector = { x, y }
    } else {
      vector = snake.vector
    }

    const angle = random(-maxRotation, maxRotation)

    const randomVector = {
      x: vector.x * Math.cos(angle) - vector.y * Math.sin(angle),
      y: vector.x * Math.sin(angle) - vector.y * Math.cos(angle),
    }

    const x = snake.x + randomVector.x * speed
    const y = snake.y + randomVector.y * speed

    const outOfHoriztontalBounds =
      x < 0 || x > this.state.contextState.windowWidth
    const outOfVerticalBounds =
      y < 0 || y > this.state.contextState.windowHeight
    if (outOfHoriztontalBounds || outOfVerticalBounds) {
      return {
        x: snake.x - randomVector.x * speed,
        y: snake.y - randomVector.y * speed,
        vector: { x: -vector.x, y: -vector.y },
      }
    }

    return { x, y, vector }
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

  _makeSnake = () => {
    const angle = random(Math.PI * 2)
    return {
      x: random(200, 800),
      y: random(200, 800),
      vector: { x: Math.cos(angle), y: Math.sin(angle) },
    }
  }

  state: AquariumControllerState = {
    mouseX: window.innerWidth / 2,
    mouseY: window.innerHeight / 2,
    interestPoint: null,
    controlled: false,
    contextState: {
      windowWidth: window.innerWidth,
      windowHeight: window.innerHeight,
      snakes: range(10).map(this._makeSnake),
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

export { InterestPoint, AquariumContext, AquariumController }
