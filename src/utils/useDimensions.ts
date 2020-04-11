import { useState, useCallback, useLayoutEffect } from 'react'

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

function useDimensions({ liveMeasure = true }) {
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
  const [node, setNode] = useState(null)

  const ref = useCallback(node => {
    setNode(node)
  }, [])

  useLayoutEffect(() => {
    if (node) {
      const measure = () =>
        window.requestAnimationFrame(() =>
          setDimensions(getDimensionObject(node))
        )
      measure()

      if (liveMeasure) {
        window.addEventListener('resize', measure)

        return () => {
          window.removeEventListener('resize', measure)
        }
      }
    }
  }, [node])

  return [ref, dimensions, node]
}

export default useDimensions
