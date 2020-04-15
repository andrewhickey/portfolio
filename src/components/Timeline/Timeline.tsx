import { css } from '@emotion/core'
import { format, parseISO } from 'date-fns'
import * as React from 'react'
import { useCallback, useEffect, useState } from 'react'
import { ResumeSchema } from '../../types/ResumeSchema'
import { color2, color3 } from '../../utils/colors'
import { rhythm } from '../../utils/typography'
import useDimensions, { Dimensions } from '../../utils/useDimensions'
import TimelineBackground from './TimelineBackground'
import SkillIcon from '../SkillIcon/SkillIcon'

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
  const [measureRef, dimensions] = useDimensions({ liveMeasure: true })

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
        paddingTop: rhythm(2),
        paddingBottom: rhythm(2),
      }}
    >
      <TimelineBackground
        containerDimensions={dimensions}
        eventDimensions={eventDimensions}
        css={{
          top: 0,
          position: 'absolute',
        }}
      />

      {events.map((job, index) => {
        const isEven = index % 2 === 0

        return (
          <div
            key={index}
            className="p-3"
            css={css`
              position: relative;
              width: 50%;
              text-align: ${isEven ? 'right' : 'left'};
              align-self: ${isEven ? 'flex-start' : 'flex-end'};
            `}
          >
            <BorderedContainer
              className="p-3"
              id={index.toString()}
              onChangeDimensions={onChangeDimensions}
              onUnmount={onUnmount}
            >
              <h2
                className="text-xl font-bold"
                css={{
                  color: color3,
                }}
              >
                {format(job.startDate, 'LLL yyyy')}
              </h2>
              <h3
                css={{
                  color: color2,
                }}
              >
                {job.name}
              </h3>
              <span
                className="font-bold"
                css={{
                  color: 'white',
                }}
              >
                {job.position}
                {/* {job.keywords?.map((keyword: string) => (
                  <SkillIcon skill={keyword} />
                ))} */}
              </span>
            </BorderedContainer>
          </div>
        )
      })}
    </div>
  )
}

export default Timeline
