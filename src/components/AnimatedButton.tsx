import * as React from 'react'
import { PureComponent } from 'react'
import { Motion, spring, presets } from 'react-motion'
import { path } from 'd3-path'
import { AquariumContext } from '../context/AquariumContext'
import { Point, getPointsOnRect, edgesToPoints } from '../utils/lines'
import Measure from './Measure'

interface AnimatedButtonProps {
  padding?: number
  children?: string
}
class AnimatedButton extends PureComponent<AnimatedButtonProps> {
  borderRef = React.createRef<SVGPathElement>()
  svgRef = React.createRef<SVGSVGElement>()

  static defaultProps = {
    padding: 10,
    children: '',
  }

  state = {
    borderLength: 0,
    hasFocus: false,
    entryPoint: { x: 0, y: 0 },
  }

  componentDidUpdate() {
    this._updatePathLength()
  }

  _updatePathLength = () => {
    const border = this.borderRef.current
    const borderLength = border.getTotalLength()
    this.setState({ borderLength })
  }

  _handleMouseMove = (updatePoint: (point?: Point) => void) => (
    event: React.MouseEvent<SVGSVGElement>
  ) => {
    updatePoint({ x: event.clientX, y: event.clientY })
  }

  _getEntryPointFromMouseEvent = (event: React.MouseEvent<SVGSVGElement>) => {
    const borderRect = this.svgRef.current.getBoundingClientRect()
    const localX = event.clientX - borderRect.left
    const localY = event.clientY - borderRect.top
    return { x: localX, y: localY }
  }

  _handleMouseEnter = (event: React.MouseEvent<SVGSVGElement>) => {
    const entryPoint = this._getEntryPointFromMouseEvent(event)
    this.setState({ hasFocus: true, entryPoint })
  }

  _handleMouseLeave = (updatePoint: (point?: Point) => void) => (
    event: React.MouseEvent<SVGSVGElement>
  ) => {
    const entryPoint = this._getEntryPointFromMouseEvent(event)
    this.setState({ hasFocus: false, entryPoint })
    updatePoint(null)
  }

  _getDimensions = (textWidth: number, textHeight: number) => {
    const { padding } = this.props
    const width = textWidth + padding * 2
    const height = textHeight + padding * 2
    return { width, height }
  }

  _getPath = (points: Point[]) => {
    const borderPath = path()

    borderPath.moveTo(points[0].x, points[0].y)

    points.slice(1).forEach(point => {
      borderPath.lineTo(point.x, point.y)
    })

    borderPath.closePath()

    return borderPath.toString()
  }

  render() {
    const { children } = this.props
    const { borderLength, hasFocus, entryPoint } = this.state
    const targetLength = hasFocus ? borderLength / 2 : 0
    const textColor = hasFocus ? 'red' : 'black'

    return (
      <AquariumContext.Consumer>
        {({ updatePoint }) => (
          <Measure>
            {({ width: textWidth, height: textHeight, ref }) => {
              const { width, height } = this._getDimensions(
                textWidth,
                textHeight
              )
              const border = edgesToPoints(0, 0, width, height)
              const clockwiseHalf = getPointsOnRect(
                entryPoint,
                0,
                0,
                width,
                height
              )
              const antiClockwiseHalf = getPointsOnRect(
                entryPoint,
                0,
                0,
                width,
                height,
                false
              )
              return (
                <svg
                  ref={this.svgRef}
                  xmlns="http://www.w3.org/2000/svg"
                  width={width}
                  height={height}
                  onMouseMove={this._handleMouseMove(updatePoint)}
                  onMouseEnter={this._handleMouseEnter}
                  onMouseLeave={this._handleMouseLeave(updatePoint)}
                >
                  <Motion
                    defaultStyle={{
                      dashLength: targetLength,
                    }}
                    style={{
                      dashLength: spring(targetLength),
                    }}
                  >
                    {({ dashLength }) => (
                      <>
                        <path
                          ref={this.borderRef}
                          d={this._getPath(border)}
                          style={{
                            stroke: 'black',
                            fill: 'none',
                            strokeWidth: '4px',
                          }}
                        />
                        <path
                          ref={this.borderRef}
                          d={this._getPath(clockwiseHalf)}
                          style={{
                            stroke: 'red',
                            fill: 'none',
                            strokeWidth: '4px',
                            strokeDasharray: `${dashLength} ${borderLength -
                              dashLength}`,
                          }}
                        />
                        <path
                          ref={this.borderRef}
                          d={this._getPath(antiClockwiseHalf)}
                          style={{
                            stroke: 'red',
                            fill: 'none',
                            strokeWidth: '4px',
                            strokeDasharray: `${dashLength} ${borderLength -
                              dashLength}`,
                          }}
                        />
                        <text
                          ref={ref}
                          dx="50%"
                          dy="50%"
                          textAnchor="middle"
                          dominantBaseline="central"
                          style={{
                            stroke: textColor,
                            fontSize: '30px',
                            fill: textColor,
                          }}
                        >
                          {children}
                        </text>
                      </>
                    )}
                  </Motion>
                </svg>
              )
            }}
          </Measure>
        )}
      </AquariumContext.Consumer>
    )
  }
}

export default AnimatedButton
