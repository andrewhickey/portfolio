import * as React from 'react'
import { useCallback, useState } from 'react'
import { Dimensions } from '../../utils/useDimensions'

const PositionContext = React.createContext<{
  dimensions: {
    [id: string]: Dimensions
  }
  onChangeDimensions: (id: string, dimensions: Dimensions) => void
  onUnmount: (id: string) => void
}>({ dimensions: {}, onChangeDimensions: () => {}, onUnmount: () => {} })

type PositionContextProviderProps = {
  children: React.ReactNode
}
function PositionContextProvider({ children }: PositionContextProviderProps) {
  const [dimesionsMap, setDimensionsMap] = useState<{
    [id: string]: Dimensions
  }>({})

  const onChangeDimensions = useCallback(
    (index, dimensions) => {
      const nextDimensionsMap = { ...dimesionsMap, [index]: dimensions }
      setDimensionsMap(nextDimensionsMap)
    },
    [setDimensionsMap, dimesionsMap]
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
