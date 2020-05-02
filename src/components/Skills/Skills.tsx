import * as React from 'react'
import { useState, useEffect, useMemo, useCallback } from 'react'
import {
  useTrail,
  animated,
  config,
  AnimatedValue,
  useSpring,
} from 'react-spring'
import { ResumeSchema } from '../../types/ResumeSchema'
import { color1 } from '../../utils/colors'
import SkillIcon from '../SkillIcon'

const getKeywords = (resume: ResumeSchema) => {
  const keywords = new Set<string>()
  resume.skills?.forEach(skill => {
    skill.keywords?.forEach(keyword => {
      keywords.add(keyword)
    })
  })

  return [...keywords.values()]
}

type SkillsProps = {
  resume: ResumeSchema
}

function Skills({ resume }: SkillsProps) {
  const [target, setTarget] = useState(3)
  const [targetOpacity, setTargetOpacity] = useState(0)
  // const [textOpacity, setTextOpacity] = useState(0)
  // const animatedTextOpacity = useSpring({ opacity: textOpacity })

  useEffect(() => {
    setTarget(0)
    setTargetOpacity(1)
  }, [setTarget])

  const keywords = useMemo(() => getKeywords(resume), [resume])
  const translations = useTrail(keywords.length, {
    value: target,
    opacity: targetOpacity,
    config: config.stiff,
  })

  const handleMouseEnter = useCallback(() => {
    setTarget(1)
    // setTextOpacity(1)
  }, [setTarget])

  const handleMouseLeave = useCallback(() => {
    setTarget(0)
    // setTextOpacity(0)
  }, [setTarget])

  return (
    <div
      className="flex justify-center items-center md:justify-end"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* <animated.div
        className="whitespace-no-wrap"
        style={{ opacity: animatedTextOpacity.opacity }}
      >
        CLICK ME
      </animated.div> */}
      {translations.reverse().map(({ value, opacity }, index) => (
        <animated.div
          key={keywords[index]}
          className="ml-4 flex flex-col items-center w-10"
          style={{
            transform: value
              .interpolate({ range: [0, 1], output: [40, 0] })
              .interpolate(
                translation =>
                  `translate(${translation *
                    (translations.length - 1 - index)}px, 0px)`
              ),
            opacity,
          }}
        >
          <div
            className="rounded-full p-2"
            css={{
              backgroundColor: 'white',
              boxShadow: `0px 0px 5px 0px ${color1}`,
            }}
          >
            <SkillIcon skill={keywords[index]} stroke={color1} fill={color1} />
          </div>
          <animated.div
            className="text-xs whitespace-no-wrap"
            style={{
              opacity: value,
            }}
          >
            {keywords[index]}
          </animated.div>
        </animated.div>
      ))}
    </div>
  )
}

export default Skills
