import * as React from 'react'
import { isEqual } from 'lodash'
import Measure from './Measure'
import {
  UpdateObstacleFunction,
  AquariumContext,
} from '../context/AquariumContext'

interface ObstacleReporterProps {
  obstacleId: string
  children: React.ReactNode
  rect: DOMRectReadOnly
  updateObstacle: UpdateObstacleFunction
}
class ObstacleReporter extends React.Component<ObstacleReporterProps> {
  componentDidUpdate(prevProps: ObstacleReporterProps) {
    this._updateObstacle(prevProps)
  }

  _updateObstacle = (prevProps: ObstacleReporterProps) => {
    const { rect, obstacleId, updateObstacle } = this.props
    const { rect: prevRect } = prevProps

    if (rect && !isEqual(rect, prevRect)) {
      updateObstacle(obstacleId, {
        x: rect.x,
        y: rect.y,
        width: rect.width,
        height: rect.height,
      })
    }
  }

  render() {
    return this.props.children
  }
}

interface ObstacleProps {
  children: (args: { ref: React.RefObject<any> }) => React.ReactNode
  obstacleId: string
}
class ObstacleWrapper extends React.Component<ObstacleProps> {
  render() {
    return (
      <Measure>
        {({ ref, rect }) => (
          <AquariumContext.Consumer>
            {({ updateObstacle }) => (
              <ObstacleReporter
                obstacleId={this.props.obstacleId}
                updateObstacle={updateObstacle}
                rect={rect}
              >
                {this.props.children({ ref })}
              </ObstacleReporter>
            )}
          </AquariumContext.Consumer>
        )}
      </Measure>
    )
  }
}

export default ObstacleWrapper
