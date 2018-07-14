import * as React from 'react'
import { Component } from 'react'
import { Stage, Layer } from 'react-konva'
import Snake from './Snake'
import { AquariumContext } from '../context/AquariumContext'

class Aquarium extends Component {
  render() {
    return (
      <div style={{ position: 'fixed', top: 0, zIndex: -1 }}>
        <AquariumContext.Consumer>
          {({ snakes, windowWidth, windowHeight }) => (
            <Stage width={windowWidth} height={windowHeight}>
              <Layer>
                {snakes.map((snake, i) => (
                  <Snake key={i} x={snake.x} y={snake.y} />
                ))}
              </Layer>
            </Stage>
          )}
        </AquariumContext.Consumer>
      </div>
    )
  }
}

export default Aquarium
