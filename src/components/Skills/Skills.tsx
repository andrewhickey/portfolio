import * as React from 'react'
import { useState, useEffect, useCallback, useMemo } from 'react'
import {
  useTrail,
  animated,
  config,
  interpolate,
  useSpring,
} from 'react-spring'
import { ResumeSchema } from '../../types/ResumeSchema'
import { color1, color2 } from '../../utils/colors'
import SkillIcon from '../SkillIcon'

const ITEM_WIDTH = 40
const ITEM_HEIGHT = 60

type SkillItemProps = {
  index: number
  item: any
  style?: React.CSSProperties
  barStyle?: React.CSSProperties
  textStyle?: React.CSSProperties
  onClick?: (index: number) => void
}
function SkillItem({
  item,
  index,
  style,
  barStyle,
  textStyle,
  onClick,
}: SkillItemProps) {
  const handleClick = useCallback(
    e => {
      if (onClick) {
        e.stopPropagation()
        onClick(index)
      }
    },
    [onClick, index]
  )

  return (
    <animated.div
      className="ml-4 relative flex flex-col items-end"
      style={style}
    >
      <animated.div
        css={{
          height: '20px',
          width: item.skill * 2,
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
        onClick={handleClick}
        className="rounded-full p-2"
        css={{
          backgroundColor: 'white',
          boxShadow: `0px 0px 5px 0px ${color1}`,
        }}
      >
        <SkillIcon skill={item.name} stroke={color1} fill={color1} />
      </div>

      <animated.div className="text-xs whitespace-no-wrap" style={textStyle}>
        {item.name}
      </animated.div>
    </animated.div>
  )
}

type AnimatedSkillItemProps = {
  targetX: any
  targetY: any
  item: any
  index: number
  opacity: any
  onClick?: (index: number) => void
}
function AnimatedSkillItem({
  opacity,
  targetX,
  targetY,
  index,
  item,
  onClick,
}: AnimatedSkillItemProps) {
  const { xOffset } = useSpring({ xOffset: index * -ITEM_WIDTH })
  const { yOffset } = useSpring({
    to: { yOffset: index * ITEM_HEIGHT },
    from: { yOffset: (index - 1) * ITEM_HEIGHT },
  })

  const scaledX = interpolate(
    [targetX, xOffset],
    (targetX, xOffset) => targetX * xOffset
  )
  const scaledY = interpolate(
    [targetY, yOffset],
    (targetY, yOffset) => targetY * yOffset
  )

  return (
    <SkillItem
      onClick={onClick}
      index={index}
      item={item}
      style={{
        zIndex: index,
        position: 'absolute',
        right: 0,
        top: 0,
        transform: interpolate(
          [scaledX, scaledY],
          (x, y) => `translate3d(${x}px, ${y}px, 0)`
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
}

type SkillsProps = {
  resume: ResumeSchema
}
function Skills({ resume }: SkillsProps) {
  const skills = resume.skills || []

  const [openStates, setOpenStates] = useState<boolean[]>(
    skills.map(() => false)
  )
  const [isExpanded, setIsExpanded] = useState(false)
  const [targetX, setTargetX] = useState(3)
  const [targetOpacity, setTargetOpacity] = useState(0)

  const items = useMemo(
    () =>
      skills.reduce<Array<any>>((allItems, skill, index) => {
        if (openStates[index]) {
          const keywords = (skill.keywords || []).map(keyword => ({
            name: keyword,
          }))
          return [...allItems, skill, ...keywords]
        } else {
          return [...allItems, skill]
        }
      }, []),
    [openStates, skills]
  )

  useEffect(() => {
    setTargetX(0.4)
    setTargetOpacity(1)
  }, [setTargetX, setTargetOpacity])

  const transitions = useTrail(items.length, {
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

  const handleClickItem = useCallback(
    index => {
      setOpenStates(
        openStates.map((isOpen, i) => {
          if (i === index) {
            return !isOpen
          } else {
            return isOpen
          }
        })
      )
    },
    [openStates, setOpenStates]
  )

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
        {items.map((item, index) => (
          <SkillItem key={item.name} item={item} index={index} />
        ))}
      </div>
      {items.map((item, index) => {
        const { targetX, targetY, opacity } = transitions[index]
        return (
          <AnimatedSkillItem
            key={item.name}
            item={item}
            index={index}
            onClick={isExpanded ? handleClickItem : undefined}
            targetX={targetX}
            targetY={targetY}
            opacity={opacity}
          />
        )
      })}
    </div>
  )
}

export default Skills
