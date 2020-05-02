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
  const [measureRef, dimensions] = useDimensions({ liveMeasure: true })
  const [openStates, setOpenStates] = useState<{ [index: number]: boolean }>({})

  const events = getEventsFromResume(resume)

  const [animations, setAnimation] = useSprings(events.length, () => ({
    value: 0,
  }))

  const handleMouseEnter = useCallback(
    (index: number) => {
      setAnimation((i: number) => {
        if (index !== i) return
        return { value: openStates[index] ? 1 : 0.2 }
      })
    },
    [setAnimation, openStates]
  )

  const handleMouseLeave = useCallback(
    (index: number) => {
      setAnimation((i: number) => {
        if (index !== i) return
        return { value: 0 }
      })
    },
    [setAnimation]
  )

  const handleClick = useCallback(
    (index: number) => {
      const isOpen = !openStates[index]
      const nextState = { ...openStates, [index]: isOpen }
      setOpenStates(nextState)

      setAnimation((i: number) => {
        if (index !== i) return
        return { value: isOpen ? 1 : 0.2 }
      })
    },
    [setAnimation, openStates, setOpenStates]
  )

  return (
    <PositionContextProvider>
      <div
        ref={measureRef}
        css={{
          display: 'flex',
          flexDirection: 'column',
          position: 'relative',
          paddingTop: rhythm(2),
          paddingBottom: rhythm(2),
        }}
      >
        <TimelineBackground
          animations={animations}
          containerDimensions={dimensions}
          css={{
            top: 0,
            position: 'absolute',
          }}
        />

        {events.map((item, index) => {
          const isEven = index % 2 === 0

          return (
            <TimelineWebItem
              key={index}
              index={index}
              isEven={isEven}
              isOpen={openStates[index]}
              item={item}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              onClick={handleClick}
            />
          )
        })}
      </div>
    </PositionContextProvider>
  )
}

export default Timeline
