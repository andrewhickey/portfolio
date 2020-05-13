import classNames from 'classnames'
import * as React from 'react'
import { useCallback, useState, memo } from 'react'
import { Flipped, Flipper } from 'react-flip-toolkit'
import { AiOutlineClose } from 'react-icons/ai'
import { ResumeSchema } from '../../types/ResumeSchema'
import { color1, color2, color3 } from '../../utils/colors'
import SkillIcon from '../SkillIcon'

const BAR_MAX_WIDTH = 200

const createBarFlipId = (index: number) => `bar-${index}`
const createSubBarFlipId = (keyword: string) => `subBar-${keyword}`
const createIconFlipId = (index: number) => `icon-${index}`
const createSubIconFlipId = (keyword: string) => `subIcon-${keyword}`
const createTextFlipId = (index: number) => `text-${index}`
const createSubTextFlipId = (keyword: string) => `subText-${keyword}`
const shouldFlip = (isOpen: boolean, index: number) => (
  prev: number,
  current: number
) => isOpen || index === current

type SubItemProps = {
  keyword: string
  index: number
  isOpen: boolean
}
const SubItem = memo(({ keyword, index, isOpen }: SubItemProps) => {
  const [isVisible, setIsVisible] = useState(isOpen)
  const handleComplete = useCallback(() => {
    setIsVisible(isOpen)
  }, [setIsVisible, isOpen])

  return (
    <li
      className="flex flex-col items-end"
      css={{ top: 0, right: 0, transition: 'opacity 0.5s' }}
      style={{
        position: isOpen ? 'relative' : 'absolute',
        visibility: isVisible || isOpen ? 'visible' : 'hidden',
        opacity: isOpen ? 1 : 0,
      }}
    >
      <Flipped
        spring="gentle"
        onComplete={handleComplete}
        flipId={createSubIconFlipId(keyword)}
        shouldFlip={shouldFlip(isOpen, index)}
        stagger="subitem"
      >
        <div
          className="rounded-full p-2"
          css={{
            willChange: 'transform',
            backgroundColor: 'white',
            boxShadow: `0px 0px 5px 0px ${color1}`,
          }}
        >
          <SkillIcon
            skill={keyword}
            css={{
              stroke: color1,
              fill: color1,
            }}
          />
        </div>
      </Flipped>
      <Flipped
        spring="gentle"
        flipId={createSubTextFlipId(keyword)}
        shouldFlip={shouldFlip(isOpen, index)}
        stagger="subtext"
      >
        <div
          css={{ willChange: 'transform' }}
          className="text-xs whitespace-no-wrap text-right"
        >
          {keyword}
        </div>
      </Flipped>
    </li>
  )
})

type VerticalItemProps = {
  index: number
  onClick: (index: number) => void
  item: any
  isOpen: boolean
}
const VerticalItem = memo(
  ({ index, onClick, item, isOpen }: VerticalItemProps) => {
    const handleClick = useCallback(() => {
      if (onClick) {
        onClick(index)
      }
    }, [index, onClick])

    return (
      <li
        className="relative cursor-pointer flex flex-col items-end"
        onClick={handleClick}
      >
        <div className="flex items-center">
          <Flipped
            spring="gentle"
            flipId={createBarFlipId(index)}
            stagger="bar"
          >
            <div
              css={{
                willChange: 'transform',
                marginRight: '-10px',
                transformOrigin: 'right',
                height: '20px',
                width: (item.skill / 100) * BAR_MAX_WIDTH,
                backgroundColor: color2,
              }}
            />
          </Flipped>

          <Flipped
            spring="gentle"
            flipId={createIconFlipId(index)}
            stagger="item"
          >
            <div
              className="rounded-full p-2"
              css={{
                willChange: 'transform',
                backgroundColor: color3,
                boxShadow: `0px 0px 5px 0px ${color1}`,
                zIndex: 10,
              }}
            >
              <SkillIcon
                skill={item.name}
                css={{
                  stroke: 'white',
                  fill: 'white',
                }}
              />
            </div>
          </Flipped>
        </div>

        <Flipped
          spring="gentle"
          flipId={createTextFlipId(index)}
          stagger="text"
        >
          <div
            css={{ willChange: 'transform' }}
            className="text-xs whitespace-no-wrap text-right"
          >
            {item.name}
          </div>
        </Flipped>

        <ul>
          {item.keywords.map((keyword: string) => (
            <SubItem
              key={keyword}
              keyword={keyword}
              index={index}
              isOpen={isOpen}
            />
          ))}
        </ul>
      </li>
    )
  }
)

type HorizontalItemProps = {
  index: number
  item: any
}
const HorizontalItem = memo(({ index, item }: HorizontalItemProps) => {
  return (
    <li>
      <div className="flex items-center">
        <Flipped spring="gentle" flipId={createBarFlipId(index)} stagger="bar">
          <div
            css={{
              position: 'absolute',
              opacity: 0,
              height: '20px',
              width: 0,
              backgroundColor: color2,
            }}
          />
        </Flipped>

        <Flipped
          spring="gentle"
          flipId={createIconFlipId(index)}
          stagger="item"
        >
          <div
            className="rounded-full p-2"
            css={{
              backgroundColor: 'white',
              boxShadow: `0px 0px 5px 0px ${color1}`,
              zIndex: 10,
            }}
          >
            <SkillIcon
              skill={item.name}
              css={{
                stroke: color1,
                fill: color1,
              }}
            />
          </div>
        </Flipped>
      </div>
    </li>
  )
})

type SkillsProps = {
  resume: ResumeSchema
}
const Skills = memo(({ resume }: SkillsProps) => {
  const skills = resume.skills || []

  const [isVertical, setIsVertical] = useState(false)
  const [openStates, setOpenStates] = useState<boolean[]>(
    skills.map(() => false)
  )
  const [activeIndex, setActiveIndex] = useState(0)

  const handleExpand = useCallback(() => {
    if (!isVertical) {
      setIsVertical(true)
      setActiveIndex(0)
    }
  }, [isVertical, setIsVertical, setActiveIndex])

  const handleCollapse = useCallback(() => {
    if (isVertical) {
      setIsVertical(false)
      setActiveIndex(0)
      setOpenStates(openStates.map(() => false))
    }
  }, [isVertical, setIsVertical, setActiveIndex, setOpenStates, openStates])

  const handleClickItem = useCallback(
    index => {
      setOpenStates(
        openStates.map((isOpen, i) => {
          return i === index ? !isOpen : isOpen
        })
      )
      setActiveIndex(index)
    },
    [openStates, setOpenStates, setActiveIndex]
  )

  return (
    <Flipper
      flipKey={isVertical.toString() + openStates.join('')}
      decisionData={activeIndex}
    >
      <ul
        className={classNames('flex items-end', {
          'flex-col': isVertical,
          'flex-row-reverse': !isVertical,
          'cursor-pointer': !isVertical,
        })}
        css={{
          '& li, & ul': {
            margin: 0,
          },
        }}
        onClick={handleExpand}
      >
        {isVertical && (
          <AiOutlineClose
            className="cursor-pointer self-start"
            onClick={handleCollapse}
          />
        )}

        {skills.map((item, index) => {
          if (isVertical) {
            return (
              <VerticalItem
                key={item.name}
                item={item}
                index={index}
                onClick={isVertical ? handleClickItem : undefined}
                isOpen={openStates[index]}
              />
            )
          } else {
            return <HorizontalItem key={item.name} item={item} index={index} />
          }
        })}
      </ul>
    </Flipper>
  )
})

export default Skills
