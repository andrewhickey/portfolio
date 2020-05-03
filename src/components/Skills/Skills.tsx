import * as React from 'react'
import { useState, useEffect, useCallback } from 'react'
import { useTrail, animated, config, interpolate } from 'react-spring'
import { ResumeSchema } from '../../types/ResumeSchema'
import { color1, color2 } from '../../utils/colors'
import SkillIcon from '../SkillIcon'

const getSkills = (resume: ResumeSchema) => {
  const keywords = new Set<string>()
  resume.skills?.forEach(skill => {
    skill.keywords?.forEach(keyword => {
      keywords.add(keyword)
    })
  })

  return [...keywords.values()]
}

type SkillItemProps = {
  skill: any
  style?: React.CSSProperties
  barStyle?: React.CSSProperties
  textStyle?: React.CSSProperties
}
function SkillItem({ skill, style, barStyle, textStyle }: SkillItemProps) {
  return (
    <animated.div
      className="ml-4 relative flex flex-col items-end"
      style={style}
    >
      <animated.div
        css={{
          height: '20px',
          width: skill.skill * 2,
          zIndex: -1,
          backgroundColor: color2,
          position: 'absolute',
          transformOrigin: 'right',
          right: 0,
          top: (36 - 20) / 2,
        }}
        style={barStyle}
      />

      <div
        className="rounded-full p-2"
        css={{
          backgroundColor: 'white',
          boxShadow: `0px 0px 5px 0px ${color1}`,
        }}
      >
        <SkillIcon skill={skill.name} stroke={color1} fill={color1} />
      </div>

      <animated.div className="text-xs whitespace-no-wrap" style={textStyle}>
        {skill.name}
      </animated.div>
    </animated.div>
  )
}

type SkillsProps = {
  resume: ResumeSchema
}
function Skills({ resume }: SkillsProps) {
  const [isExpanded, setIsExpanded] = useState(false)
  const [targetX, setTargetX] = useState(3)
  const [targetOpacity, setTargetOpacity] = useState(0)

  useEffect(() => {
    setTargetX(0.4)
    setTargetOpacity(1)
  }, [setTargetX, setTargetOpacity])

  const skills = resume.skills || []

  const transitions = useTrail(skills.length, {
    targetX: isExpanded ? 0 : targetX,
    targetY: isExpanded ? 1 : 0,
    opacity: targetOpacity,
    config: config.stiff,
  })

  const handleMouseEnter = useCallback(() => {
    setTargetX(1)
  }, [setTargetX])

  const handleMouseLeave = useCallback(() => {
    setTargetX(0.4)
  }, [setTargetX])

  const handleClick = useCallback(() => {
    setIsExpanded(!isExpanded)
  }, [isExpanded, setIsExpanded])

  return (
    <div
      className="relative cursor-pointer"
      onClick={handleClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div
        className="flex justify-center items-center md:justify-end invisible"
        css={{
          flexDirection: isExpanded ? 'column' : 'row',
        }}
      >
        {/* Render an invisble list of the items so that we reserve the correct amount of space */}
        {skills.map((skill, index) => (
          <SkillItem key={skill.name} skill={skill} />
        ))}
      </div>
      {skills.map((skill, index) => {
        const { targetX, targetY, opacity } = transitions[index]
        const scaledX = targetX.interpolate({
          range: [0, 1],
          output: [0, -40],
        })
        const scaledY = targetY.interpolate({
          range: [0, 1],
          output: [0, 60],
        })

        return (
          <SkillItem
            key={skill.name}
            skill={skill}
            style={{
              zIndex: index,
              position: 'absolute',
              right: 0,
              top: 0,
              transform: interpolate(
                [scaledX, scaledY],
                (x, y) => `translate3d(${x * index}px, ${y * index}px, 0)`
              ),
              opacity,
            }}
            barStyle={{
              transform: targetY.interpolate(
                y => `translate3d(${-30}px, 0, 0) scale(${y}, 1)`
              ),
              opacity: targetY,
            }}
            textStyle={{
              opacity: targetY,
              textAlign: 'right',
            }}
          />
        )
      })}
    </div>
  )
}

export default Skills
