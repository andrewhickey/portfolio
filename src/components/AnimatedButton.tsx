import * as React from 'react'
import { Component } from 'react'

class AnimatedButton extends Component {
  textRef = React.createRef<SVGTextElement>()
  borderRef = React.createRef<SVGPathElement>()

  state = { width: 10, height: 10 }

  componentDidMount() {
    this.resizeToText()
  }

  resizeToText = () => {
    const text = this.textRef.current
    if (text) {
      const boundingBox = text.getBBox()
      this.setState({ width: boundingBox.width, height: boundingBox.height })
    }
  }

  render() {
    const { width, height } = this.state

    return (
      <svg xmlns="http://www.w3.org/2000/svg" width={width} height={height}>
        <path
          d={`M0 0 H${width} V${height} H0 L0 0`}
          style={{ stroke: 'black', fill: 'none', strokeDasharray: '10px' }}
        />
        <text
          dy="50%"
          dominantBaseline="central"
          style={{ stroke: 'black', fill: 'none', strokeDasharray: '1px' }}
          ref={this.textRef}
        >
          TEXT!
        </text>
      </svg>
    )
  }
}

export default AnimatedButton