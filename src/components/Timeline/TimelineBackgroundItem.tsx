import * as React from 'react'
import { path } from 'd3-path'
import { Dimensions } from '../../utils/useDimensions'

type TimelineBackgroundItemProps = {
  dimensions: Dimensions
  horizontalCenter: number
}

function TimelineBackgroundItem({
  dimensions,
  horizontalCenter,
}: TimelineBackgroundItemProps) {
  const borderTopPath = path()
  const borderBottomPath = path()
  const insetPath = path()

  if (dimensions.left + 1 >= horizontalCenter) {
    borderTopPath.moveTo(
      dimensions.left,
      dimensions.top + dimensions.height / 2
    )
    borderTopPath.lineTo(dimensions.left, dimensions.top)
    borderTopPath.lineTo(dimensions.left + dimensions.width, dimensions.top)
    borderTopPath.lineTo(
      dimensions.left + dimensions.width,
      dimensions.top + dimensions.height / 2
    )

    borderBottomPath.moveTo(
      dimensions.left,
      dimensions.top + dimensions.height / 2
    )
    borderBottomPath.lineTo(dimensions.left, dimensions.top + dimensions.height)
    borderBottomPath.lineTo(
      dimensions.left + dimensions.width,
      dimensions.top + dimensions.height
    )
    borderBottomPath.lineTo(
      dimensions.left + dimensions.width,
      dimensions.top + dimensions.height / 2
    )

    insetPath.moveTo(horizontalCenter, dimensions.top + dimensions.height / 2)
    insetPath.lineTo(dimensions.left, dimensions.top + dimensions.height / 2)
  }

  if (dimensions.left + 1 < horizontalCenter) {
    borderTopPath.moveTo(
      dimensions.left + dimensions.width,
      dimensions.top + dimensions.height / 2
    )
    borderTopPath.lineTo(dimensions.left + dimensions.width, dimensions.top)
    borderTopPath.lineTo(dimensions.left, dimensions.top)
    borderTopPath.lineTo(
      dimensions.left,
      dimensions.top + dimensions.height / 2
    )

    borderBottomPath.moveTo(
      dimensions.left + dimensions.width,
      dimensions.top + dimensions.height / 2
    )
    borderBottomPath.lineTo(
      dimensions.left + dimensions.width,
      dimensions.top + dimensions.height
    )
    borderBottomPath.lineTo(dimensions.left, dimensions.top + dimensions.height)
    borderBottomPath.lineTo(
      dimensions.left,
      dimensions.top + dimensions.height / 2
    )

    insetPath.moveTo(horizontalCenter, dimensions.top + dimensions.height / 2)
    insetPath.lineTo(
      dimensions.left + dimensions.width,
      dimensions.top + dimensions.height / 2
    )
  }

  return (
    <g
      css={{
        fill: 'none',
      }}
    >
      <path d={insetPath.toString()} />
      {/* <path d={borderTopPath.toString()} /> */}
      {/* <path d={borderBottomPath.toString()} /> */}
    </g>
  )
}

export default TimelineBackgroundItem
