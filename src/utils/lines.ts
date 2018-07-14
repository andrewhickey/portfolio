interface Point {
  x: number
  y: number
}

const findMin = (array: number[]) =>
  array.reduce(
    (smallestIndex, currentValue, index, values) =>
      currentValue < values[smallestIndex] ? index : smallestIndex,
    0
  )

const getClosestEdge = (
  intersect: Point,
  left: number,
  top: number,
  right: number,
  bottom: number
) => {
  const distances = [
    Math.abs(intersect.x - left),
    Math.abs(intersect.y - top),
    Math.abs(intersect.x - right),
    Math.abs(intersect.y - bottom),
  ]
  const min = findMin(distances)
  return min
}

const edgesToPoints = (
  left: number,
  top: number,
  right: number,
  bottom: number
) => [
  { x: left, y: top },
  { x: right, y: top },
  { x: right, y: bottom },
  { x: left, y: bottom },
]

// going in a clockWise direction get the corner points from a point near a rectangle
const getPointsOnRect = (
  intersect: Point,
  left: number,
  top: number,
  right: number,
  bottom: number,
  clockWise = true
) => {
  const points = edgesToPoints(left, top, right, bottom)

  const closestEdge = getClosestEdge(intersect, left, top, right, bottom)

  let pointOnEdge: Point

  switch (closestEdge) {
    case 0:
      pointOnEdge = { x: left, y: intersect.y }
      break
    case 1:
      pointOnEdge = { x: intersect.x, y: top }
      break
    case 2:
      pointOnEdge = { x: right, y: intersect.y }
      break
    case 3:
      pointOnEdge = { x: intersect.x, y: bottom }
      break
  }

  const orderedPoints = [
    ...points.slice(closestEdge),
    ...points.slice(0, closestEdge),
  ]

  if (clockWise) return [pointOnEdge, ...orderedPoints]
  return [pointOnEdge, ...orderedPoints.reverse()]
}

// https://medium.com/@francoisromain/smooth-a-svg-path-with-cubic-bezier-curves-e37b49d46c74
const line = (pointA: Point, pointB: Point) => {
  const lengthX = pointB.x - pointA.x
  const lengthY = pointB.y - pointA.y
  return {
    length: Math.sqrt(Math.pow(lengthX, 2) + Math.pow(lengthY, 2)),
    angle: Math.atan2(lengthY, lengthX),
  }
}

// When 'currentPoint' is at the start or end of a line
// 'previousPoint' or 'nextPoint' don't exist.
// Default to 'currentPoint'
const getControlPoint = (
  currentPoint: Point,
  previousPoint: Point = currentPoint,
  nextPoint: Point = currentPoint,
  reverse: boolean = false
) => {
  const p = previousPoint || currentPoint
  const n = nextPoint || currentPoint
  const smoothing = 0.2

  // Properties of the opposed-line
  const o = line(p, n)

  // If is end-control-point, add PI to the angle to go backward
  const angle = o.angle + (reverse ? Math.PI : 0)
  const length = o.length * smoothing

  const x = currentPoint.x + Math.cos(angle) * length
  const y = currentPoint.y + Math.sin(angle) * length

  return { x, y }
}

export { Point, edgesToPoints, getPointsOnRect, line, getControlPoint }
