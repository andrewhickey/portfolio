import { css } from '@emotion/core'
import { format } from 'date-fns'
import * as React from 'react'
import { useCallback } from 'react'
import { color2, color3 } from '../../utils/colors'
import { TimelineItem } from './types'

type TimelineWebItemProps = {
  index: number
  isEven: boolean
  isOpen: boolean
  item: TimelineItem
  onClick: (index: number) => void
}

function TimelineWebItem({
  index,
  isEven,
  item,
  isOpen,
  onClick,
}: TimelineWebItemProps) {
  const handleClick = useCallback(() => {
    onClick(index)
  }, [onClick])

  return (
    <div
      className="p-6"
      css={css`
        position: relative;
        width: 50%;
        text-align: ${isEven ? 'right' : 'left'};
        align-self: ${isEven ? 'flex-start' : 'flex-end'};
      `}
      onClick={handleClick}
    >
      <h2
        css={{
          color: color3,
        }}
      >
        <span className="text-lg">{format(item.startDate, 'LLL')} </span>
        <span className="text-xl font-bold">
          {format(item.startDate, 'yyyy')}
        </span>
      </h2>
      <h3
        css={{
          color: color2,
        }}
        className="text-lg mt-2"
      >
        {item.name}
      </h3>
      <h3
        className="font-bold mt-2"
        css={{
          color: 'white',
        }}
      >
        {item.position}
        {/* {item.keywords?.map((keyword: string) => (
            <SkillIcon skill={keyword} />
          ))} */}
      </h3>
      {isOpen && (
        <>
          <h3 className="mt-8">{item.summary}</h3>
          {item.highlights && (
            <ul className="mt-4 text-sm">
              {item.highlights.map((highlight: string, index: number) => (
                <li key={index}>{highlight}</li>
              ))}
            </ul>
          )}
        </>
      )}
    </div>
  )
}

export default TimelineWebItem
