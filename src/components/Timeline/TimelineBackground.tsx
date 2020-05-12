import { path } from 'd3-path'
import * as React from 'react'
import { useContext, useState } from 'react'
import { color2 } from '../../utils/colors'
import useDimensions, { Dimensions } from './useDimensions'
import { PositionContext } from './PositionContext'
import TimelineBackgroundItem from './TimelineBackgroundItem'
import { TimelineItem } from './types'

const LINE_WEIGHT = 5
const PADDING_VERTICAL = 60

type TimelineBackgroundProps = {
  className?: string
  items: TimelineItem[]
  onClickItem: (index: number) => void
  openStates: boolean[]
}

function TimelineBackground({
  className,
  items,
  onClickItem,
  openStates,
}: TimelineBackgroundProps) {
  const sizes = useState<(Dimensions | null)[]>(items.map((item): null => null))
  const [measureRef, dimensions] = useDimensions({ liveMeasure: true })

  const { width, height, top, left } = dimensions
  const horizontalCenter = width / 2

  const centerLinePath = path()
  centerLinePath.moveTo(horizontalCenter, PADDING_VERTICAL)
  centerLinePath.lineTo(horizontalCenter, height - PADDING_VERTICAL)

  return (
    <svg
      className={className}
      width="100%"
      height={400}
      viewBox={`0 0 ${826} ${400}`}
      ref={measureRef}
    >
      <g fill={color2} stroke={color2} strokeWidth={LINE_WEIGHT}>
        {/* <defs>
          <linearGradient id="gradientLeft">
            <stop offset="90%" stopColor={color2} stopOpacity={0} />
            <stop offset="100%" stopColor={color2} />
          </linearGradient>
          <linearGradient id="gradientRight">
            <stop offset="0%" stopColor={color2} />
            <stop offset="10%" stopColor={color2} stopOpacity={0} />
          </linearGradient>
        </defs> */}
        <circle r={LINE_WEIGHT} cx={horizontalCenter} cy={PADDING_VERTICAL} />
        <path d={centerLinePath.toString()} />
        <circle
          r={LINE_WEIGHT}
          cx={horizontalCenter}
          cy={height - PADDING_VERTICAL}
        />
        {items.map((item, index) => {
          return (
            <TimelineBackgroundItem
              onClick={onClickItem}
              key={index}
              item={item}
              index={index}
              isEven={index % 2 == 0}
              isOpen={openStates[index]}
            />
          )
        })}
      </g>
    </svg>
  )
}

export default TimelineBackground
