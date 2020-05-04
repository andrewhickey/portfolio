import * as React from 'react'
import { useState, useEffect, useCallback, useMemo } from 'react'
import {
  useTrail,
  animated,
  config,
  interpolate,
  useSpring,
  useTransition,
} from 'react-spring'
import { ResumeSchema } from '../../types/ResumeSchema'
import { color1, color2 } from '../../utils/colors'
import SkillIcon from '../SkillIcon'
import { position } from 'polished'

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

      <animated.div
        className="text-xs whitespace-no-wrap text-right"
        style={textStyle}
      >
        {item.name}
      </animated.div>
    </animated.div>
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
  const [isHovered, setIsHovered] = useState(false)

  const items = useMemo(() => {
    const { items, subItems } = skills.reduce<{
      items: any[]
      subItems: any[]
      visibleItems: number
    }>(
      ({ items, subItems, visibleItems }, skill, index) => {
        const nextSkill = {
          ...skill,
          startIndex: 0,
          endIndex: visibleItems,
          visible: true,
        }

        const keywords = (skill.keywords || []).map(
          (keyword, keyWordIndex) => ({
            name: keyword,
            endIndex: openStates[index]
              ? visibleItems + keyWordIndex + 1
              : visibleItems,
            startIndex: visibleItems,
            visible: openStates[index],
          })
        )

        const visibleItemsToAdd = openStates[index] ? keywords.length + 1 : 1

        return {
          items: [...items, nextSkill],
          subItems: [...subItems, ...keywords],
          visibleItems: visibleItems + visibleItemsToAdd,
        }
      },
      { items: [], subItems: [], visibleItems: 0 }
    )

    return [...items, ...subItems]
  }, [openStates, isExpanded, skills])

  const positions = useTransition(items, item => item.name, {
    from: item => ({
      xOffset: isExpanded ? 0 : item.startIndex * -ITEM_WIDTH,
      yOffset: isExpanded ? item.startIndex * ITEM_HEIGHT : 0,
      opacity: 0,
      expanded: isExpanded ? 1 : 0,
    }),
    enter: item => ({
      xOffset: isExpanded ? 0 : item.endIndex * -ITEM_WIDTH,
      yOffset: isExpanded ? item.endIndex * ITEM_HEIGHT : 0,
      opacity: 1,
      expanded: isExpanded ? 1 : 0,
    }),
    leave: item => ({
      expanded: 0,
      xOffset: isExpanded ? 0 : item.startIndex * -ITEM_WIDTH,
      yOffset: isExpanded ? item.startIndex * ITEM_HEIGHT : 0,
      opacity: 0,
    }),
    update: item => ({
      xOffset: isExpanded ? 0 : item.endIndex * -ITEM_WIDTH,
      yOffset: isExpanded ? item.endIndex * ITEM_HEIGHT : 0,
      opacity: item.visible ? 1 : 0,
      expanded: isExpanded ? 1 : 0,
    }),
    trail: 60,
    unique: true,
  })

  const handleMouseEnter = useCallback(() => {
    setIsHovered(true)
  }, [setIsHovered])

  const handleMouseLeave = useCallback(() => {
    setIsHovered(false)
  }, [setIsHovered])

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
        {items.map((item, index) =>
          item.visible ? (
            <SkillItem key={item.name} item={item} index={index} />
          ) : null
        )}
      </div>
      {items.map((item, index) => {
        const { xOffset, yOffset, opacity, expanded } = positions[index].props

        return (
          <SkillItem
            key={item.name}
            item={item}
            index={index}
            onClick={isExpanded ? handleClickItem : undefined}
            style={{
              zIndex: items.length - index,
              position: 'absolute',
              right: 0,
              top: 0,
              transform: interpolate(
                [xOffset, yOffset],
                (x, y) => `translate3d(${x}px, ${y}px, 0)`
              ),
              opacity,
            }}
            barStyle={{
              transform: expanded.interpolate(
                yScale => `translate3d(${-30}px, 0, 0) scale(${yScale}, 1)`
              ),
              opacity: expanded,
            }}
            textStyle={{
              opacity: expanded,
            }}
          />
        )
      })}
    </div>
  )
}

export default Skills
