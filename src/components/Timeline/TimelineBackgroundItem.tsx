import * as React from 'react'
import { path } from 'd3-path'
import { Dimensions } from './useDimensions'
import { AnimatedValue, animated } from 'react-spring'

type TimelineBackgroundItemProps = {
  dimensions: Dimensions
  horizontalCenter: number
  animation: AnimatedValue<{ value: number }>
}

function TimelineBackgroundItem({
  dimensions,
  horizontalCenter,
  animation,
}: TimelineBackgroundItemProps) {
  const { value } = animation
  const borderTopPath = path()
  const borderBottomPath = path()
  const insetPath = path()

  const isRight = dimensions.left + 1 >= horizontalCenter

  if (isRight) {
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
  } else {
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

  const lineLength = dimensions.height + dimensions.width + 1

  const strokeDashoffset = value.interpolate(
    value => lineLength - lineLength * value
  )

  return (
    <g
      css={{
        fill: 'none',
      }}
    >
      <path d={insetPath.toString()} css={{ strokeLinecap: 'round' }} />
      <animated.path
        d={borderTopPath.toString()}
        css={{
          // stroke: `url(#${isRight ? 'gradientRight' : 'gradientLeft'})`,
          strokeDasharray: lineLength,
          strokeLinecap: 'round',
        }}
        style={{
          strokeDashoffset,
        }}
      />
      <animated.path
        d={borderBottomPath.toString()}
        css={{
          // stroke: `url(#${isRight ? 'gradientRight' : 'gradientLeft'})`,
          strokeDasharray: lineLength,
          strokeLinecap: 'round',
        }}
        style={{
          strokeDashoffset,
        }}
      />
    </g>
  )
}

export default TimelineBackgroundItem
