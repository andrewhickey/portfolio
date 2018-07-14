import * as React from 'react'
import { Component, createContext } from 'react'
import { Point } from '../utils/lines'

interface AquariumState {
  point: Point
  updatePoint: (point: Point) => void
}
const AquariumContext = createContext<AquariumState>({
  point: { x: 300, y: 300 },
  updatePoint: () => {},
})

interface AquariumStateProps {
  children: React.ReactNode
}

class AquariumController extends Component<AquariumStateProps> {
  updatePoint = (point: Point) => {
    this.setState({ point })
  }

  state = {
    point: { x: 300, y: 300 },
    updatePoint: this.updatePoint,
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

export { AquariumContext, AquariumController }
