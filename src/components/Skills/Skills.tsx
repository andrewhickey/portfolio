import * as React from 'react'
import { useState, useEffect, useMemo, useCallback } from 'react'
import { useTrail, animated, config, AnimatedValue } from 'react-spring'
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
  const [target, setTarget] = useState(1)
  const [targetOpacity, setTargetOpacity] = useState(0)

  useEffect(() => {
    setTarget(0)
    setTargetOpacity(1)
  }, [setTarget])

  const keywords = useMemo(() => getKeywords(resume), [resume])
  const translations = useTrail(keywords.length, {
    value: target,
    opacity: targetOpacity,
    config: config.default,
  })

  const handleMouseEnter = useCallback(() => {
    setTarget(0.1)
  }, [setTarget])

  const handleMouseLeave = useCallback(() => {
    setTarget(0)
  }, [setTarget])

  return (
    <div
      className="flex justify-center md:justify-end"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {translations.reverse().map(({ value, opacity }, index) => (
        <animated.div
          key={keywords[index]}
          className="rounded-full p-2"
          css={{
            backgroundColor: 'white',
            boxShadow: `0px 0px 5px 0px ${color1}`,
          }}
          style={{
            transform: value
              .interpolate({ range: [0, 1], output: [10, -200] })
              .interpolate(
                translation =>
                  `translate(${translation *
                    (translations.length - 1 - index)}px, 0px)`
              ),
            opacity,
          }}
        >
          <SkillIcon skill={keywords[index]} stroke={color1} fill={color1} />
        </animated.div>
      ))}
    </div>
  )
}

export default Skills
