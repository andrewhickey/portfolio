import * as React from 'react'
import { useState, useEffect, useMemo } from 'react'
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
  useEffect(() => {
    setTarget(0)
  }, [setTarget])

  const keywords = useMemo(() => getKeywords(resume), [resume])
  const translations = useTrail(keywords.length, {
    value: target,
    config: config.default,
  })

  return (
    <>
      {translations.reverse().map(({ value }, index) => (
        <animated.div
          key={keywords[index]}
          className="rounded-full p-2 ml-2"
          css={{
            backgroundColor: 'white',
          }}
          style={{
            transform: value
              .interpolate({ range: [0, 1], output: [0, -200] })
              .interpolate(translation => `translate(${translation}px, 0px)`),
            opacity: value.interpolate({ range: [0, 1], output: [1, 0] }),
          }}
        >
          <SkillIcon skill={keywords[index]} stroke={color1} fill={color1} />
        </animated.div>
      ))}
    </>
  )
}

export default Skills
