import * as React from 'react'
import { Component } from 'react'
import { Group, Path } from 'react-konva'
import { range } from 'lodash'
import { StaggeredMotion, spring, presets, PlainStyle } from 'react-motion'
import { path } from 'd3-path'

interface Point extends PlainStyle {
  x: number
  y: number
}

// https://medium.com/@francoisromain/smooth-a-svg-path-with-cubic-bezier-curves-e37b49d46c74
const line = (pointA: Point, pointB: Point) => {
  const lengthX = pointB.x - pointA.x
  const lengthY = pointB.y - pointA.y
  return {
    length: Math.sqrt(Math.pow(lengthX, 2) + Math.pow(lengthY, 2)),
    angle: Math.atan2(lengthY, lengthX),
  }
}

// When 'currentPoint' is at the start or end of a line
// 'previousPoint' or 'nextPoint' don't exist.
// Default to 'currentPoint'
const getControlPoint = (
  currentPoint: Point,
  previousPoint: Point = currentPoint,
  nextPoint: Point = currentPoint,
  reverse: boolean = false
) => {
  const p = previousPoint || currentPoint
  const n = nextPoint || currentPoint
  const smoothing = 0.2

  // Properties of the opposed-line
  const o = line(p, n)

  // If is end-control-point, add PI to the angle to go backward
  const angle = o.angle + (reverse ? Math.PI : 0)
  const length = o.length * smoothing

  const x = currentPoint.x + Math.cos(angle) * length
  const y = currentPoint.y + Math.sin(angle) * length

  return { x, y }
}

interface SnakeProps {
  x: number
  y: number
}
class Snake extends Component<SnakeProps> {
  getStyles = (prevStyles: Point[]) => {
    const { x, y } = this.props

    const nextStyles = prevStyles.map((_, i) => {
      if (i === 0) return { x, y }
      return {
        x: spring(prevStyles[i - 1].x),
        y: spring(prevStyles[i - 1].y),
      }
    })

    return nextStyles
  }

  renderPath = (points: Point[]) => {
    const snakePath = path()

    points.forEach((point, i) => {
      if (i === 0) return snakePath.moveTo(points[0].x, points[0].y)
      const controlPoint1 = getControlPoint(
        points[i - 1],
        points[i - 2],
        point,
        false
      )
      const controlPoint2 = getControlPoint(
        point,
        points[i - 1],
        points[i + 1],
        true
      )
      return snakePath.bezierCurveTo(
        controlPoint1.x,
        controlPoint1.y,
        controlPoint2.x,
        controlPoint2.y,
        point.x,
        point.y
      )
    })

    return (
      <Group>
        <Path data={snakePath.toString()} stroke="green" strokeWidth={5} />
      </Group>
    )
  }

  render() {
    const { x, y } = this.props

    const defaultStyles = range(10).map(() => ({ x, y }))

    return (
      <StaggeredMotion defaultStyles={defaultStyles} styles={this.getStyles}>
        {this.renderPath}
      </StaggeredMotion>
    )
  }
}

export default Snake

{
  /* <Path
        x={x}
        y={y}
        data="M12.582,9.551C3.251,16.237,0.921,29.021,7.08,38.564l-2.36,1.689l4.893,2.262l4.893,2.262l-0.568-5.36l-0.567-5.359l-2.365,1.694c-4.657-7.375-2.83-17.185,4.352-22.33c7.451-5.338,17.817-3.625,23.156,3.824c5.337,7.449,3.625,17.813-3.821,23.152l2.857,3.988c9.617-6.893,11.827-20.277,4.935-29.896C35.591,4.87,22.204,2.658,12.582,9.551z"
        fill="green"
      /> */
}
