import * as React from 'react'
import { useEffect, useContext } from 'react'
import { PositionContext } from './PositionContext'
import useDimensions from '../../utils/useDimensions'

type PositionTrackerProps = {
  id: string
  children?: React.ReactNode
  className?: string
}
function PositionTracker({ id, children, className }: PositionTrackerProps) {
  const { onChangeDimensions, onUnmount } = useContext(PositionContext)
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

export default PositionTracker
