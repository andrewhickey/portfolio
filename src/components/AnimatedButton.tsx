import * as React from 'react'
import { PureComponent } from 'react'
import { Motion, spring } from 'react-motion'
import ResizeObserver from 'resize-observer-polyfill'
import { AquariumContext } from '../context/AquariumContext'
import { Point } from '../utils/lines'

interface AnimatedButtonProps {
  padding?: number
}
class AnimatedButton extends PureComponent<AnimatedButtonProps> {
  textRef = React.createRef<SVGTextElement>()
  borderRef = React.createRef<SVGPathElement>()

  static defaultProps = {
    padding: 10,
  }

  state = {
    textWidth: 0,
    textHeight: 0,
    borderLength: 0,
    hasFocus: false,
  }

  resizeObserver = new ResizeObserver(changedNodes => {
    changedNodes.forEach(node => {
      const { width, height } = node.contentRect
      this.setState({ textWidth: width, textHeight: height })
    })
  })

  componentDidMount() {
    const text = this.textRef.current
    this.resizeObserver.observe(text)
  }

  componentWillUnmount() {
    this.resizeObserver.disconnect()
  }

  componentDidUpdate() {
    this._updatePathLength()
  }

  _updatePathLength = () => {
    const border = this.borderRef.current
    const borderLength = border.getTotalLength()
    this.setState({ borderLength })
  }

  _handleMouseMove = (updatePoint: (point: Point) => void) => (
    event: React.MouseEvent<SVGSVGElement>
  ) => {
    updatePoint({ x: event.clientX, y: event.clientY })
  }

  _setFocus = () => {
    this.setState({ hasFocus: true })
  }

  _setBlur = () => {
    this.setState({ hasFocus: false })
  }

  render() {
    const { padding } = this.props
    const { textWidth, textHeight, borderLength, hasFocus } = this.state
    const width = textWidth + padding * 2
    const height = textHeight + padding * 2

    const targetOffset = hasFocus ? 0 : borderLength

    return (
      <AquariumContext.Consumer>
        {({ updatePoint }) => (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width={width}
            height={height}
            onMouseMove={this._handleMouseMove(updatePoint)}
            onMouseEnter={this._setFocus}
            onMouseLeave={this._setBlur}
          >
            <Motion
              defaultStyle={{ dashOffset: borderLength }}
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
                    dx="50%"
                    dy="50%"
                    textAnchor="middle"
                    dominantBaseline="central"
                    style={{
                      stroke: 'black',
                      fontSize: '30px',
                      fill: 'black',
                    }}
                  >
                    TEXT!
                  </text>
                </>
              )}
            </Motion>
          </svg>
        )}
      </AquariumContext.Consumer>
    )
  }
}

export default AnimatedButton
