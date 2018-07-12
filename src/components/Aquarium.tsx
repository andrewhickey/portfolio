import * as React from 'react'
import { Component } from 'react'
import { Stage, Layer, Path } from 'react-konva'
import Snake from './Snake'

class Aquarium extends Component {
  state = {
    mouseX: window.innerWidth / 2,
    mouseY: window.innerHeight / 2,
    width: 0,
    height: 0,
  }

  componentDidMount() {
    window.addEventListener('resize', this.storeWindowSize)
    window.addEventListener('mousemove', this.handleMouseMove)
    window.addEventListener('touchmove', this.handleTouchMove)
    this.storeWindowSize()
  }

  componentWillUnmount() {
    window.removeEventListener('mousemove', this.handleMouseMove)
    window.removeEventListener('touchmove', this.handleMouseMove)
    window.removeEventListener('touchmove', this.handleTouchMove)
  }

  storeWindowSize() {
    const width = window.innerWidth
    const height = window.innerHeight
    this.setState({ width, height })
  }

  handleMouseMove = ({ pageX, pageY }: MouseEvent) => {
    this.setMousePosition(pageX, pageY)
  }

  handleTouchMove = ({ touches }: TouchEvent) => {
    this.setMousePosition(touches[0].pageX, touches[0].pageY)
  }

  setMousePosition = (mouseX: number, mouseY: number) => {
    this.setState({ mouseX, mouseY })
  }

  render() {
    const { mouseX, mouseY, width, height } = this.state
    return (
      <div style={{ position: 'fixed', top: 0, zIndex: -1 }}>
        <Stage width={width} height={height}>
          <Layer>
            <Snake x={mouseX} y={mouseY} />
          </Layer>
        </Stage>
      </div>
    )
  }
}

export default Aquarium
