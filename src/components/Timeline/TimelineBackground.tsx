import { path } from 'd3-path'
import * as React from 'react'
import { useContext } from 'react'
import { color2 } from '../../utils/colors'
import { Dimensions } from '../../utils/useDimensions'
import { PositionContext } from './PositionContext'
import TimelineBackgroundItem from './TimelineBackgroundItem'

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

          return (
            <TimelineBackgroundItem
              dimensions={{
                ...dimensions,
                left: adjustedLeft,
                top: adjustedTop,
              }}
              horizontalCenter={horizontalCenter}
            />
          )
        })}
      </g>
    </svg>
  )
}

export default TimelineBackground
