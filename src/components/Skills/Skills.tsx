import * as React from 'react'
import { useState, useEffect, useMemo, useCallback, useRef } from 'react'
import { useTrail, animated, config, interpolate } from 'react-spring'
import { ResumeSchema } from '../../types/ResumeSchema'
import { color1, color2 } from '../../utils/colors'
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

type SkillItemProps = {
  keyword: string
  style?: React.CSSProperties
  barStyle?: React.CSSProperties
  textStyle?: React.CSSProperties
}
function SkillItem({ keyword, style, barStyle, textStyle }: SkillItemProps) {
  return (
    <animated.div key={keyword} className="ml-4" style={style}>
      <div className="flex items-center">
        <animated.div
          css={{ height: '20px', backgroundColor: color2, width: 0 }}
          style={barStyle}
        />
        <div
          className="rounded-full p-2"
          css={{
            backgroundColor: 'white',
            boxShadow: `0px 0px 5px 0px ${color1}`,
          }}
        >
          <SkillIcon skill={keyword} stroke={color1} fill={color1} />
        </div>
      </div>

      <animated.div className="text-xs whitespace-no-wrap" style={textStyle}>
        {keyword}
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

  const keywords = useMemo(() => getKeywords(resume), [resume])

  const transitions = useTrail(keywords.length, {
    targetX: isExpanded ? 0 : targetX,
    targetY: isExpanded ? 1 : 0,
    opacity: targetOpacity,
    config: config.stiff,
  })

  const barTransitions = useTrail(keywords.length, {
    width: isExpanded ? 100 : 0,
    config: config.stiff,
  })

  const handleMouseEnter = useCallback(() => {
    if (!isExpanded) {
      setTargetX(1)
    }
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
        {/* <animated.div
        className="whitespace-no-wrap"
        style={{ opacity: animatedTextOpacity.opacity }}
      >
        CLICK ME
      </animated.div> */}

        {/* Render an invisble list of the items so that we reserve the correct amount of space */}
        {keywords.map((keyword, index) => (
          <SkillItem key={keyword} keyword={keyword} />
        ))}
      </div>
      {keywords.map((keyword, index) => {
        if (!transitions[index]) return null
        if (!barTransitions[index]) return null

        const { targetX, targetY, opacity } = transitions[index]
        const { width } = barTransitions[index]
        const scaledX = targetX.interpolate({
          range: [0, 1],
          output: [0, -50],
        })
        const scaledY = targetY.interpolate({
          range: [0, 1],
          output: [0, 60],
        })

        return (
          <SkillItem
            key={keyword}
            keyword={keyword}
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
            barStyle={{ width, opacity: targetY }}
            textStyle={{
              opacity: targetY,
              textAlign: 'right',
              display: isExpanded ? 'block' : 'none',
            }}
          />
        )
      })}
    </div>
  )
}

export default Skills
