import * as React from 'react'
import { useEffect, useState, useCallback } from 'react'
import { parseISO, format } from 'date-fns'
import { css } from '@emotion/core'
import { ResumeSchema } from '../../types/ResumeSchema'
import { rhythm } from '../../utils/typography'
import { color4, color2 } from '../../utils/colors'
import useDimensions, { Dimensions } from '../../utils/useDimensions'
import TimelineBackground from './TimelineBackground'

type BorderedEventProps = {
  onChangeDimensions: (id: string, dimensions: any) => void
  onUnmount: (id: string) => void
  id: string
  children?: React.ReactNode
  className?: string
}
function BorderedContainer({
  id,
  onChangeDimensions,
  onUnmount,
  children,
  className,
}: BorderedEventProps) {
  const [measureRef, dimensions] = useDimensions({ liveMeasure: false })

  useEffect(() => {
    onChangeDimensions(id, dimensions)
  }, [dimensions, id])

  useEffect(() => {
    return () => onUnmount(id)
  }, [id])

  return (
    <div ref={measureRef} className={className}>
      {children}
    </div>
  )
}

type Event = {
  startDate: Date
}

function getEventsFromResume(resume: ResumeSchema) {
  const work = resume.work?.map(job => ({
    ...job,
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
  const [measureRef, dimensions] = useDimensions({ liveMeasure: false })
  const [eventDimensions, setEventDimensions] = useState<{
    [id: string]: Dimensions
  }>({})

  const onChangeDimensions = useCallback(
    (index, dimensions) => {
      const nextEventDimensions = { ...eventDimensions, [index]: dimensions }
      setEventDimensions(nextEventDimensions)
    },
    [setEventDimensions, eventDimensions]
  )

  const onUnmount = useCallback(
    (index: string) => {
      const { [index]: valueToForget, ...nextEventDimensions } = eventDimensions
      setEventDimensions(nextEventDimensions)
    },
    [setEventDimensions, eventDimensions]
  )

  const events = getEventsFromResume(resume)

  return (
    <div
      ref={measureRef}
      css={{
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
      }}
    >
      <TimelineBackground
        containerDimensions={dimensions}
        eventDimensions={eventDimensions}
        css={{
          position: 'absolute',
        }}
      />

      {events.map((job, index) => {
        const isEven = index % 2 === 0

        return (
          <div
            css={css`
              position: relative;
              padding: ${rhythm(1)};
              width: 50%;
              text-align: ${isEven ? 'right' : 'left'};
              align-self: ${isEven ? 'flex-start' : 'flex-end'};
            `}
          >
            <BorderedContainer
              css={{
                padding: rhythm(0.5),
              }}
              key={index}
              id={index.toString()}
              onChangeDimensions={onChangeDimensions}
              onUnmount={onUnmount}
            >
              <h2
                css={{
                  marginTop: rhythm(0.5),
                }}
              >
                {format(job.startDate, 'LLL yyyy')}
              </h2>
              <h3
                css={{
                  marginTop: rhythm(0.5),
                }}
              >
                {job.name}
              </h3>
              <b>{job.position}</b>
            </BorderedContainer>
          </div>
        )
      })}
    </div>
  )
}

export default Timeline
