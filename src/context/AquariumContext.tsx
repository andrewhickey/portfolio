import * as React from 'react'
import { Component, createContext } from 'react'

interface Obstacle {
  x: number
  y: number
  width: number
  height: number
}

type Obstacles = Map<string, Obstacle>

interface Point {
  x: number
  y: number
}

interface UpdateObstacleFunction {
  (id: string, obstacle: Obstacle): void
}

interface SetTriggerPointFunction {
  (point?: Point): void
}

interface AquariumState {
  obstacles: Obstacles
  triggerPoint?: Point
  updateObstacle: UpdateObstacleFunction
  setTriggerPoint: SetTriggerPointFunction
}
const AquariumContext = createContext<AquariumState>({
  obstacles: new Map(),
  triggerPoint: null,
  updateObstacle: () => {},
  setTriggerPoint: () => {},
})

interface AquariumControllerProps {
  children: React.ReactNode
}

class AquariumController extends Component<AquariumControllerProps> {
  _setTriggerPoint = (point?: Point) => {
    this.setState({
      triggerPoint: point,
    })
  }

  _updateObstacle = (key: string, obstacle: Obstacle) => {
    this.setState({
      obstacles: this.state.obstacles.set(key, obstacle),
    })
  }

  state: AquariumState = {
    obstacles: new Map(),
    triggerPoint: null,
    updateObstacle: this._updateObstacle,
    setTriggerPoint: this._setTriggerPoint,
  }

  render() {
    const { children } = this.props

    return (
      <AquariumContext.Provider value={this.state}>
        {children}
      </AquariumContext.Provider>
    )
  }
}

export {
  Obstacle,
  Obstacles,
  Point,
  UpdateObstacleFunction,
  SetTriggerPointFunction,
  AquariumContext,
  AquariumController,
}
