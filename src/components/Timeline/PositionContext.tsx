import * as React from 'react'
import { useCallback, useState } from 'react'
import { Dimensions } from './useDimensions'

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

const PositionContext = React.createContext<{
  dimensions: {
    [id: string]: Dimensions
  }
  onChangeDimensions: (
    id: string,
    dimensions: Dimensions,
    node: HTMLElement
  ) => void
  onUnmount: (id: string) => void
}>({ dimensions: {}, onChangeDimensions: () => {}, onUnmount: () => {} })

type PositionContextProviderProps = {
  children: React.ReactNode
}
function PositionContextProvider({ children }: PositionContextProviderProps) {
  const [dimesionsMap, setDimensionsMap] = useState<{
    [id: string]: Dimensions
  }>({})
  const [nodesMap, setNodesMap] = useState<{
    [id: string]: HTMLElement
  }>({})

  const onChangeDimensions = useCallback(
    (index, dimensions, node) => {
      const nextNodesMap = { ...nodesMap, [index]: node }
      const nextDimensionsMap = Object.entries(nodesMap).reduce(
        (accumlation, [id, node]) => {
          if (node) {
            return { ...accumlation, [id]: getDimensionObject(node) }
          } else {
            return accumlation
          }
        },
        {}
      )

      setNodesMap(nextNodesMap)
      setDimensionsMap(nextDimensionsMap)
    },
    [setDimensionsMap, dimesionsMap, nodesMap, setNodesMap]
  )

  const onUnmount = useCallback(
    (index: string) => {
      const { [index]: valueToForget, ...nextDimensionsMap } = dimesionsMap
      setDimensionsMap(nextDimensionsMap)
    },
    [setDimensionsMap, dimesionsMap]
  )

  return (
    <PositionContext.Provider
      value={{
        dimensions: dimesionsMap,
        onChangeDimensions,
        onUnmount,
      }}
    >
      {children}
    </PositionContext.Provider>
  )
}

export { PositionContext }
export default PositionContextProvider
