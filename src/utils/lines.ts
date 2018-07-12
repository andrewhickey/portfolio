interface Point {
  x: number
  y: number
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

export { Point, line, getControlPoint }
