import * as React from 'react'
import { path } from 'd3-path'
import { TimelineItem } from './types'
import { Dimensions } from './useDimensions'
import TimelineWebItem from './TimelineWebItem'

type TimelineBackgroundItemProps = {
  item: TimelineItem
  isEven: boolean
  index: number
  isOpen: boolean
  onClick: (index: number) => void
}

function TimelineBackgroundItem({
  item,
  isEven,
  isOpen,
  index,
  onClick,
}: TimelineBackgroundItemProps) {
  // const { value } = animation
  // const borderTopPath = path()
  // const borderBottomPath = path()
  // const insetPath = path()

  // const isRight = dimensions.left + 1 >= horizontalCenter

  // if (isRight) {
  //   borderTopPath.moveTo(
  //     dimensions.left,
  //     dimensions.top + dimensions.height / 2
  //   )
  //   borderTopPath.lineTo(dimensions.left, dimensions.top)
  //   borderTopPath.lineTo(dimensions.left + dimensions.width, dimensions.top)
  //   borderTopPath.lineTo(
  //     dimensions.left + dimensions.width,
  //     dimensions.top + dimensions.height / 2
  //   )

  //   borderBottomPath.moveTo(
  //     dimensions.left,
  //     dimensions.top + dimensions.height / 2
  //   )
  //   borderBottomPath.lineTo(dimensions.left, dimensions.top + dimensions.height)
  //   borderBottomPath.lineTo(
  //     dimensions.left + dimensions.width,
  //     dimensions.top + dimensions.height
  //   )
  //   borderBottomPath.lineTo(
  //     dimensions.left + dimensions.width,
  //     dimensions.top + dimensions.height / 2
  //   )

  //   insetPath.moveTo(horizontalCenter, dimensions.top + dimensions.height / 2)
  //   insetPath.lineTo(dimensions.left, dimensions.top + dimensions.height / 2)
  // } else {
  //   borderTopPath.moveTo(
  //     dimensions.left + dimensions.width,
  //     dimensions.top + dimensions.height / 2
  //   )
  //   borderTopPath.lineTo(dimensions.left + dimensions.width, dimensions.top)
  //   borderTopPath.lineTo(dimensions.left, dimensions.top)
  //   borderTopPath.lineTo(
  //     dimensions.left,
  //     dimensions.top + dimensions.height / 2
  //   )

  //   borderBottomPath.moveTo(
  //     dimensions.left + dimensions.width,
  //     dimensions.top + dimensions.height / 2
  //   )
  //   borderBottomPath.lineTo(
  //     dimensions.left + dimensions.width,
  //     dimensions.top + dimensions.height
  //   )
  //   borderBottomPath.lineTo(dimensions.left, dimensions.top + dimensions.height)
  //   borderBottomPath.lineTo(
  //     dimensions.left,
  //     dimensions.top + dimensions.height / 2
  //   )

  //   insetPath.moveTo(horizontalCenter, dimensions.top + dimensions.height / 2)
  //   insetPath.lineTo(
  //     dimensions.left + dimensions.width,
  //     dimensions.top + dimensions.height / 2
  //   )
  // }

  // const lineLength = dimensions.height + dimensions.width + 1

  // const strokeDashoffset = value.interpolate(
  //   value => lineLength - lineLength * value
  // )

  return (
    <g
      css={{
        fill: 'none',
      }}
    >
      <foreignObject x={0} y={0} width={200} height={200}>
        <TimelineWebItem
          onClick={onClick}
          item={item}
          isEven={isEven}
          index={index}
          isOpen={isOpen}
        />
      </foreignObject>
      {/* <path d={insetPath.toString()} css={{ strokeLinecap: 'round' }} />
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
      /> */}
    </g>
  )
}

export default TimelineBackgroundItem
