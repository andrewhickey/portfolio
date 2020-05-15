import { parseISO } from 'date-fns'
import * as React from 'react'
import { useCallback, useState } from 'react'
import { ResumeSchema } from '../../types/ResumeSchema'
import { rhythm } from '../../utils/typography'
import useDimensions from './useDimensions'
import PositionContextProvider from './PositionContext'
import TimelineBackground from './TimelineBackground'
import TimelineWebItem from './TimelineWebItem'
import { useSprings, animated } from 'react-spring'
import { Flipper } from 'react-flip-toolkit'
import { color2 } from '../../utils/colors'

const sm = 768

type Event = {
  startDate: Date
  endDate: Date
}

function getEventsFromResume(resume: ResumeSchema) {
  const work = resume.work?.map(job => ({
    ...job,
    keywords: job.keywords,
    startDate: parseISO(job.startDate),
    endDate: parseISO(job.endDate),
  }))

  const events = [...work].sort(sortByStartDate)

  return events
}

const sortByStartDate = (a: Event, b: Event) =>
  b.startDate.valueOf() - a.startDate.valueOf()

type TimelineProps = {
  resume: ResumeSchema
}

function Timeline({ resume }: TimelineProps) {
  const screenWidth = window.innerWidth
  const isSmall = screenWidth <= sm

  const events = getEventsFromResume(resume)
  const [openStates, setOpenStates] = useState<boolean[]>(
    events.map(() => false)
  )
  const handleClickItem = useCallback(
    index => {
      setOpenStates(
        openStates.map((isOpen, i) => {
          return index === i ? !isOpen : isOpen
        })
      )
    },
    [openStates, setOpenStates]
  )

  return (
    <Flipper flipKey={openStates.join('')}>
      <div
        className="flex flex-col relative pb-6 pt-4"
        css={{
          paddingLeft: isSmall ? '15%' : 0,
        }}
      >
        <div
          className="flex flex-col items-center"
          css={{
            zIndex: -1,
            height: '100%',
            position: 'absolute',
            right: isSmall ? 'calc(80% - 16px)' : 0,
            left: 0,
            top: 0,
            margin: 'auto',
          }}
        >
          <div
            css={{
              width: '16px',
              height: '16px',
              borderRadius: '8px',
              backgroundColor: color2,
              marginBottom: '-4px',
            }}
          />

          <div
            className="flex-1"
            css={{
              width: '8px',
              backgroundColor: color2,
            }}
          />
          <div
            css={{
              width: '16px',
              height: '16px',
              borderRadius: '8px',
              backgroundColor: color2,
              marginTop: '-4px',
            }}
          />
        </div>
        {events.map((event, index) => (
          <TimelineWebItem
            key={index}
            item={event}
            index={index}
            isOpen={openStates[index]}
            isSmall={isSmall}
            onClick={handleClickItem}
          />
        ))}
      </div>
    </Flipper>
  )
}

export default Timeline
