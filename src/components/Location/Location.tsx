import * as React from 'react'
import { useEffect, useState, useCallback } from 'react'
import { ResumeSchema } from '../../types/ResumeSchema'
import { FaMapMarkerAlt } from 'react-icons/fa'
import { useSpring, animated, config, interpolate } from 'react-spring'
const AnimatedFaMapMarkerAlt = animated(FaMapMarkerAlt)

type LocationProps = {
  resume: ResumeSchema
}

function Location({ resume }: LocationProps) {
  const [dropAnimationValue, setDropAnimationValue] = useState(1)
  const [hoverAnimationValue, setHoverAnimationValue] = useState(0)
  const { dropAnimation } = useSpring({
    dropAnimation: dropAnimationValue,
    config: config.wobbly,
  })
  const { hoverAnimation } = useSpring({
    hoverAnimation: hoverAnimationValue,
    config: config.wobbly,
  })

  useEffect(() => {
    setTimeout(() => setDropAnimationValue(0), 0)
  }, [setDropAnimationValue])

  const handleMouseEnter = useCallback(() => {
    setHoverAnimationValue(1)
  }, [])

  const handleMouseLeave = useCallback(() => {
    setHoverAnimationValue(0)
  }, [])

  const transform = interpolate(
    [dropAnimation, hoverAnimation],
    (dropAnimation, hoverAnimation) =>
      `translate(0, ${dropAnimation * -20}px) scale(${1 +
        dropAnimation * -0.5}, ${1 +
        dropAnimation * 0.5}) translate(0, ${hoverAnimation * -4}px) scale(${1 +
        hoverAnimation * 0.2})`
  )

  return (
    <span onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      {resume.basics?.location?.city}, {resume.basics?.location?.countryCode}{' '}
      <AnimatedFaMapMarkerAlt
        className="inline align-bottom"
        style={{
          transform,
        }}
      />
    </span>
  )
}

export default Location
