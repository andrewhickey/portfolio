import * as React from 'react'
import { useState, useEffect, useMemo } from 'react'
import { ResumeSchema } from '../../types/ResumeSchema'
import SkillIcon from '../SkillIcon'
import { color1 } from '../../utils/colors'

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
  const [translation, setTranslation] = useState(200)
  useEffect(() => {
    setTimeout(() => setTranslation(0), 200)
  }, [setTranslation])

  const keywords = useMemo(() => getKeywords(resume), [resume])

  return (
    <>
      {keywords.map(keyword => (
        <div
          key={keyword}
          className="rounded-full p-2 ml-2"
          css={{
            backgroundColor: 'white',
            transition: 'transform 5s ease-in-out',
          }}
          style={{
            transform: `translate(-${translation}px, 0px)`,
          }}
        >
          <SkillIcon skill={keyword} stroke={color1} fill={color1} />
        </div>
      ))}
    </>
  )
}

export default Skills
