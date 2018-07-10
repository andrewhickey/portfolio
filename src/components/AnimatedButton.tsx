import * as React from 'react'
import { PureComponent } from 'react'
import { keyframes } from 'styled-components'
import { Motion, spring } from 'react-motion'

const drawPath = keyframes`
  to {
    stroke-dashoffset: 1000;
  }
`

class AnimatedButton extends PureComponent {
  textRef = React.createRef<SVGTextElement>()
  borderRef = React.createRef<SVGPathElement>()

  state = { width: 10, height: 10, borderLength: 0, hasFocus: false }

  componentDidMount() {
    this._resizeToText()
  }

  componentDidUpdate() {
    this._updatePathLength()
  }

  _updatePathLength = () => {
    const border = this.borderRef.current
    const borderLength = border.getTotalLength()
    this.setState({ borderLength })
  }

  _resizeToText = () => {
    const text = this.textRef.current
    const { width, height } = text.getBBox()
    this.setState({ width, height })
  }

  _setFocus = () => {
    this.setState({ hasFocus: true })
  }

  _setBlur = () => {
    this.setState({ hasFocus: false })
  }

  render() {
    const { width, height, borderLength, hasFocus } = this.state
    const targetOffset = hasFocus ? 0 : borderLength

    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={width}
        height={height}
        onMouseEnter={this._setFocus}
        onMouseLeave={this._setBlur}
      >
        <Motion
          defaultStyle={{ dashOffset: 0 }}
          style={{ dashOffset: spring(targetOffset) }}
        >
          {({ dashOffset }) => (
            <>
              <path
                ref={this.borderRef}
                d={`M0 0 H${width} V${height} H0 L0 0`}
                style={{
                  stroke: 'black',
                  fill: 'none',
                  strokeWidth: '4px',
                  strokeDashoffset: dashOffset,
                  strokeDasharray: borderLength,
                }}
              />
              <text
                ref={this.textRef}
                dy="50%"
                dominantBaseline="central"
                style={{
                  stroke: 'black',
                  fontSize: '30px',
                }}
              >
                TEXT!
              </text>
            </>
          )}
        </Motion>
      </svg>
    )
  }
}

export default AnimatedButton
