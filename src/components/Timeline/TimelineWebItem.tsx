import { css } from '@emotion/core'
import { format } from 'date-fns'
import * as React from 'react'
import { color2, color3 } from '../../utils/colors'
import PositionTracker from './PositionTracker'
import { TimelineItem } from './types'

type TimelineWebItemProps = {
  index: number
  isEven: boolean
  item: TimelineItem
}

function TimelineWebItem({ index, isEven, item }: TimelineWebItemProps) {
  return (
    <div
      className="p-3"
      css={css`
        position: relative;
        width: 50%;
        text-align: ${isEven ? 'right' : 'left'};
        align-self: ${isEven ? 'flex-start' : 'flex-end'};
      `}
    >
      <PositionTracker className="p-3" id={index.toString()}>
        <h2
          className="text-xl font-bold"
          css={{
            color: color3,
          }}
        >
          {format(item.startDate, 'LLL yyyy')}
        </h2>
        <h3
          css={{
            color: color2,
          }}
        >
          {item.name}
        </h3>
        <span
          className="font-bold"
          css={{
            color: 'white',
          }}
        >
          {item.position}
          {/* {item.keywords?.map((keyword: string) => (
        <SkillIcon skill={keyword} />
      ))} */}
        </span>
      </PositionTracker>
    </div>
  )
}

export default TimelineWebItem
