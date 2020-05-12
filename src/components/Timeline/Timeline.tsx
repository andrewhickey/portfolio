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
  const events = getEventsFromResume(resume)
  const [openStates, setOpenStates] = useState<boolean[]>(
    events.map(event => false)
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
      <div className="flex flex-col">
        {events.map((event, index) => (
          <TimelineWebItem
            key={index}
            item={event}
            index={index}
            isOpen={openStates[index]}
            onClick={handleClickItem}
          />
        ))}
      </div>
    </Flipper>
  )
}

export default Timeline
