import { useState, useCallback, useLayoutEffect, useContext } from 'react'
import ResizeObserver from 'resize-observer-polyfill'

export type Dimensions = {
  width: number
  height: number
  x: number
  y: number
  top: number
  left: number
  right: number
  bottom: number
}

function getDimensionObject(node: HTMLElement): Dimensions {
  const rect = node.getBoundingClientRect()

  return {
    width: rect.width,
    height: rect.height,
    x: rect.x,
    y: rect.y,
    top: rect.top,
    left: rect.left,
    right: rect.right,
    bottom: rect.bottom,
  }
}

type UseDimensionsOptions = {
  liveMeasure: boolean
}
function useDimensions({ liveMeasure = true }: UseDimensionsOptions) {
  const [dimensions, setDimensions] = useState<Dimensions>({
    width: 0,
    height: 0,
    x: 0,
    y: 0,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  })
  const [node, setNode] = useState<HTMLElement>(null)

  const ref = useCallback(
    (node: HTMLElement) => {
      setNode(node)
    },
    [setNode]
  )

  useLayoutEffect(() => {
    if (node) {
      const measure = () =>
        window.requestAnimationFrame(() =>
          setDimensions(getDimensionObject(node))
        )
      measure()

      if (liveMeasure) {
        const observer = new ResizeObserver(measure)
        observer.observe(node)
        // window.addEventListener('resize', measure)
        // window.addEventListener('scroll', measure)

        return () => {
          observer.disconnect()
          // window.removeEventListener('resize', measure)
          // window.removeEventListener('scroll', measure)
        }
      }
    }
  }, [node, liveMeasure, setDimensions])

  return [ref, dimensions, node]
}

export default useDimensions
