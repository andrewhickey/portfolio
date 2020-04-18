import * as React from 'react'
import { useContext, useEffect } from 'react'
import useDimensions from '../../utils/useDimensions'
import { PositionContext } from './PositionContext'

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
