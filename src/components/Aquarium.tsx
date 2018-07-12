import * as React from 'react'
import { Component } from 'react'
import { Stage, Layer } from 'react-konva'
import Snake from './Snake'
import { AquariumContext } from '../context/AquariumContext'

class Aquarium extends Component {
  state = {
    // mouseX: window.innerWidth / 2,
    // mouseY: window.innerHeight / 2,
    width: 0,
    height: 0,
  }

  componentDidMount() {
    window.addEventListener('resize', this.storeWindowSize)
    // window.addEventListener('mousemove', this.handleMouseMove)
    // window.addEventListener('touchmove', this.handleTouchMove)
    this.storeWindowSize()
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.storeWindowSize)
    // window.removeEventListener('mousemove', this.handleMouseMove)
    // window.removeEventListener('touchmove', this.handleMouseMove)
  }

  storeWindowSize() {
    const width = window.innerWidth
    const height = window.innerHeight
    this.setState({ width, height })
  }

  // handleMouseMove = ({ pageX, pageY }: MouseEvent) => {
  //   this.setMousePosition(pageX, pageY)
  // }

  // handleTouchMove = ({ touches }: TouchEvent) => {
  //   this.setMousePosition(touches[0].pageX, touches[0].pageY)
  // }

  // setMousePosition = (mouseX: number, mouseY: number) => {
  //   this.setState({ mouseX, mouseY })
  // }

  render() {
    const { width, height } = this.state
    return (
      <div style={{ position: 'fixed', top: 0, zIndex: -1 }}>
        <AquariumContext.Consumer>
          {({ point }) => {
            return (
              <Stage width={width} height={height}>
                <Layer>
                  <Snake x={point.x} y={point.y} />
                </Layer>
              </Stage>
            )
          }}
        </AquariumContext.Consumer>
      </div>
    )
  }
}

export default Aquarium
