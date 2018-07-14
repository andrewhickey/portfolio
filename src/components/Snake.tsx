import * as React from 'react'
import { Component } from 'react'
import { Group, Path } from 'react-konva'
import { range } from 'lodash'
import { StaggeredMotion, spring, presets, PlainStyle } from 'react-motion'
import { path } from 'd3-path'
import { Point, getControlPoint } from '../utils/lines'

interface SnakeProps {
  x: number
  y: number
}
class Snake extends Component<SnakeProps> {
  getStyles = (prevStyles: Array<Point & PlainStyle>) => {
    const { x, y } = this.props

    const nextStyles = prevStyles.map((_, i) => {
      if (i === 0) return { x, y }
      return {
        x: spring(prevStyles[i - 1].x, presets.wobbly),
        y: spring(prevStyles[i - 1].y + 15, presets.wobbly),
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
