import * as React from 'react'
import { isEqual } from 'lodash'
import Measure from './Measure'
import {
  SetTriggerPointFunction,
  AquariumContext,
} from '../context/AquariumContext'

interface ObstacleProps {
  children: (
    args: {
      onMouseMove: (event: React.MouseEvent<any>) => void
      onMouseLeave: () => void
    }
  ) => React.ReactNode
}
class ObstacleWrapper extends React.Component<ObstacleProps> {
  _onMouseLeave = (setTriggerPoint: SetTriggerPointFunction) => () => {
    setTriggerPoint()
  }

  _onMouseMove = (setTriggerPoint: SetTriggerPointFunction) => (
    event: React.MouseEvent<any>
  ) => {
    setTriggerPoint({ x: event.clientX, y: event.clientY })
  }

  render() {
    return (
      <AquariumContext.Consumer>
        {({ setTriggerPoint }) =>
          this.props.children({
            onMouseMove: this._onMouseMove(setTriggerPoint),
            onMouseLeave: this._onMouseLeave(setTriggerPoint),
          })
        }
      </AquariumContext.Consumer>
    )
  }
}

export default ObstacleWrapper
