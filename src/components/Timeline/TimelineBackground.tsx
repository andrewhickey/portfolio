import { path } from 'd3-path'
import * as React from 'react'
import { useContext } from 'react'
import { color2 } from '../../utils/colors'
import { Dimensions } from '../../utils/useDimensions'
import { PositionContext } from './PositionContext'

const LINE_WEIGHT = 5
const PADDING_VERTICAL = 60

type TimelineBackgroundProps = {
  className?: string
  containerDimensions: Dimensions
}

function TimelineBackground({
  className,
  containerDimensions,
}: TimelineBackgroundProps) {
  const { dimensions: eventDimensions } = useContext(PositionContext)
  const { width, height, top, left } = containerDimensions
  const horizontalCenter = width / 2

  const centerLinePath = path()
  centerLinePath.moveTo(horizontalCenter, PADDING_VERTICAL)
  centerLinePath.lineTo(horizontalCenter, height - PADDING_VERTICAL)

  return (
    <svg
      className={className}
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
    >
      <g fill={color2} stroke={color2} strokeWidth={LINE_WEIGHT}>
        <circle r={LINE_WEIGHT} cx={horizontalCenter} cy={PADDING_VERTICAL} />
        <path d={centerLinePath.toString()} />
        <circle
          r={LINE_WEIGHT}
          cx={horizontalCenter}
          cy={height - PADDING_VERTICAL}
        />
        {Object.entries(eventDimensions).map(([id, dimensions]) => {
          const adjustedLeft = dimensions.left - left
          const adjustedTop = dimensions.top - top

          const borderTopPath = path()
          const borderBottomPath = path()
          const insetPath = path()

          if (adjustedLeft + 1 >= horizontalCenter) {
            borderTopPath.moveTo(
              adjustedLeft,
              adjustedTop + dimensions.height / 2
            )
            borderTopPath.lineTo(adjustedLeft, adjustedTop)
            borderTopPath.lineTo(adjustedLeft + dimensions.width, adjustedTop)
            borderTopPath.lineTo(
              adjustedLeft + dimensions.width,
              adjustedTop + dimensions.height / 2
            )

            borderBottomPath.moveTo(
              adjustedLeft,
              adjustedTop + dimensions.height / 2
            )
            borderBottomPath.lineTo(
              adjustedLeft,
              adjustedTop + dimensions.height
            )
            borderBottomPath.lineTo(
              adjustedLeft + dimensions.width,
              adjustedTop + dimensions.height
            )
            borderBottomPath.lineTo(
              adjustedLeft + dimensions.width,
              adjustedTop + dimensions.height / 2
            )

            insetPath.moveTo(
              horizontalCenter,
              adjustedTop + dimensions.height / 2
            )
            insetPath.lineTo(adjustedLeft, adjustedTop + dimensions.height / 2)
          }

          if (adjustedLeft + 1 < horizontalCenter) {
            borderTopPath.moveTo(
              adjustedLeft + dimensions.width,
              adjustedTop + dimensions.height / 2
            )
            borderTopPath.lineTo(adjustedLeft + dimensions.width, adjustedTop)
            borderTopPath.lineTo(adjustedLeft, adjustedTop)
            borderTopPath.lineTo(
              adjustedLeft,
              adjustedTop + dimensions.height / 2
            )

            borderBottomPath.moveTo(
              adjustedLeft + dimensions.width,
              adjustedTop + dimensions.height / 2
            )
            borderBottomPath.lineTo(
              adjustedLeft + dimensions.width,
              adjustedTop + dimensions.height
            )
            borderBottomPath.lineTo(
              adjustedLeft,
              adjustedTop + dimensions.height
            )
            borderBottomPath.lineTo(
              adjustedLeft,
              adjustedTop + dimensions.height / 2
            )

            insetPath.moveTo(
              horizontalCenter,
              adjustedTop + dimensions.height / 2
            )
            insetPath.lineTo(
              adjustedLeft + dimensions.width,
              adjustedTop + dimensions.height / 2
            )
          }

          return (
            <g
              key={id}
              css={{
                fill: 'none',
              }}
            >
              <path d={insetPath.toString()} />
              {/* <path d={borderTopPath.toString()} /> */}
              {/* <path d={borderBottomPath.toString()} /> */}
            </g>
          )
        })}
      </g>
    </svg>
  )
}

export default TimelineBackground
