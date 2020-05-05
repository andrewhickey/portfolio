import * as React from 'react'
import { useState, useEffect, useCallback, useMemo } from 'react'
import {
  useTrail,
  animated,
  config,
  interpolate,
  useSpring,
  useTransition,
  useSprings,
  useChain,
} from 'react-spring'
import { ResumeSchema } from '../../types/ResumeSchema'
import { color1, color2, color3 } from '../../utils/colors'
import SkillIcon from '../SkillIcon'
import { AiOutlineClose } from 'react-icons/ai'

const ITEM_WIDTH = 40
const ITEM_HEIGHT = 60
const BAR_MAX_WIDTH = 200

type SkillItemProps = {
  isExpanded: boolean
  canHover: boolean
  index: number
  item: any
  style?: any
  barStyle?: any
  textStyle?: any
  onClick?: (index: number) => void
}
function SkillItem({
  isExpanded,
  canHover,
  item,
  index,
  style,
  barStyle,
  textStyle,
  onClick,
}: SkillItemProps) {
  const transforms = useSprings(
    item.keywords.length,
    item.keywords.map((keyword: string, index: number) => ({
      transform: `translate3d(0, ${(isExpanded ? 1 : 0) *
        (index + 1) *
        ITEM_HEIGHT}px, 0)`,
    }))
  )

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
      css={{
        '&:hover': {
          svg: {
            fill: color3,
            stroke: color3,
          },
          '.bar': {
            backgroundColor: color3,
          },
        },
      }}
      onClick={handleClick}
      style={style}
    >
      <animated.div
        className="bar"
        css={{
          height: '20px',
          width: (item.skill / 100) * BAR_MAX_WIDTH,
          zIndex: -1,
          transition: 'background-color 0.3s ease-out',
          backgroundColor: color2,
          position: 'absolute',
          transformOrigin: 'right',
          right: 0,
          top: 8,
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
        <SkillIcon
          skill={item.name}
          css={{
            transition: 'all 0.3s ease-out',
            stroke: color1,
            fill: color1,
          }}
        />
      </div>

      <animated.div
        className="text-xs whitespace-no-wrap text-right"
        style={textStyle}
      >
        {item.name}
      </animated.div>
      {item.keywords.map((keyword, index) => {
        const { transform } = transforms[index]

        return (
          <animated.div
            className="rounded-full p-2 absolute"
            css={{
              zIndex: -1,
              backgroundColor: 'white',
              boxShadow: `0px 0px 5px 0px ${color1}`,
            }}
            style={{
              transform,
            }}
          >
            <SkillIcon
              skill={keyword}
              css={{
                transition: 'stroke, fill 0.3s ease-out',
                stroke: color1,
                fill: color1,
              }}
            />
          </animated.div>
        )
      })}
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
  const [activeIndex, setActiveIndex] = useState(0)

  const [offsets, totalOffsets] = useMemo(() => {
    const offsets: number[] = []
    let totalOffsets = 0

    for (let index = 0; index < skills.length; index++) {
      let lastValue = index > 0 ? offsets[index - 1] : -1
      let difference = 1
      if (openStates[index - 1]) {
        difference += skills[index - 1]?.keywords.length
      }

      offsets.push(lastValue + difference)
      if (openStates[index]) {
        totalOffsets += skills[index]?.keywords.length
      } else {
        totalOffsets += 1
      }
    }

    return [offsets, totalOffsets]
  }, [skills, openStates])

  const animationValues = useSprings(
    skills.length,
    skills.map((skill, index) => ({
      xOffset: isExpanded
        ? 0
        : offsets[index] * -ITEM_WIDTH * (isHovered ? 1 : 0.4),
      yOffset: isExpanded ? offsets[index] * ITEM_HEIGHT : 0,
      opacity: 1,
      expanded: isExpanded ? 1 : 0,
      delay: (index - activeIndex) * 50,
    }))
  )

  const handleMouseEnter = useCallback(() => {
    setIsHovered(true)
  }, [setIsHovered])

  const handleMouseLeave = useCallback(() => {
    setIsHovered(false)
  }, [setIsHovered])

  const handleExpand = useCallback(() => {
    if (!isExpanded) {
      setIsExpanded(true)
      setActiveIndex(0)
    }
  }, [isExpanded, setIsExpanded, setActiveIndex])

  const handleCollapse = useCallback(() => {
    if (isExpanded) {
      setIsExpanded(false)
      setActiveIndex(0)
      setOpenStates(openStates.map(() => false))
    }
  }, [isExpanded, setIsExpanded, setActiveIndex, setOpenStates])

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
      setActiveIndex(index)
    },
    [openStates, skills, setOpenStates]
  )

  const width = isExpanded
    ? ITEM_WIDTH + BAR_MAX_WIDTH
    : skills.length * ITEM_WIDTH

  const height = isExpanded ? totalOffsets * ITEM_HEIGHT : ITEM_HEIGHT

  return (
    <div
      className="relative cursor-pointer"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleExpand}
    >
      <div
        css={{
          width,
          height,
        }}
      >
        {isExpanded && <AiOutlineClose onClick={handleCollapse} />}
      </div>
      {skills.map((item, index) => {
        const { xOffset, yOffset, opacity, expanded } = animationValues[index]

        return (
          <SkillItem
            key={item.name}
            item={item}
            index={index}
            onClick={isExpanded ? handleClickItem : undefined}
            isExpanded={openStates[index]}
            canHover={isExpanded && item.keywords?.length > 0}
            style={{
              zIndex: skills.length - index,
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
