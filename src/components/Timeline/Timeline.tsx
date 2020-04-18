import { parseISO } from 'date-fns'
import * as React from 'react'
import { ResumeSchema } from '../../types/ResumeSchema'
import { rhythm } from '../../utils/typography'
import useDimensions from '../../utils/useDimensions'
import TimelineBackground from './TimelineBackground'
import TimelineWebItem from './TimelineWebItem'
import PositionContextProvider from './PositionContext'

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

  const events = getEventsFromResume(resume)

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
              item={item}
            />
          )
        })}
      </div>
    </PositionContextProvider>
  )
}

export default Timeline
