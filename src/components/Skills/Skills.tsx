import * as React from 'react'
import { useCallback, useMemo, useState } from 'react'
import { AiOutlineClose } from 'react-icons/ai'
import { ResumeSchema } from '../../types/ResumeSchema'
import { color1, color2, color3 } from '../../utils/colors'
import SkillIcon from '../SkillIcon'
import classNames from 'classnames'
import { Flipper, Flipped } from 'react-flip-toolkit'

const ITEM_WIDTH = 40
const ITEM_HEIGHT = 60
const BAR_MAX_WIDTH = 200

const createIconFlipId = (index: number) => `icon-${index}`
const createSubIconFlipId = (keyword: string) => `subIcon-${keyword}`
const createTextFlipId = (index: number) => `text-${index}`
const createSubTextFlipId = (keyword: string) => `subText-${keyword}`

const shouldFlip = (index: number) => (prev: number, current: number) =>
  index === current

type SubItemProps = {
  index: number
  keyword: string
}
function SubItem({ index, keyword }: SubItemProps) {
  return (
    <li className="flex flex-col items-end">
      <Flipped flipId={createSubIconFlipId(keyword)} stagger="item">
        <div
          className="rounded-full p-2"
          css={{
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
      <Flipped flipId={createSubTextFlipId(keyword)} stagger="text">
        <div className="text-xs whitespace-no-wrap text-right">{keyword}</div>
      </Flipped>
    </li>
  )
}

type VerticalItemProps = {
  index: number
  onClick: (index: number) => void
  item: any
  isOpen: boolean
}
function VerticalItem({ index, onClick, item, isOpen }: VerticalItemProps) {
  const handleClick = useCallback(
    e => {
      if (onClick) {
        e.stopPropagation()
        onClick(index)
      }
    },
    [index, onClick]
  )

  return (
    <li className="relative" onClick={handleClick}>
      <div className="flex flex-col items-end">
        {/* <div
          css={{
            height: '20px',
            width: (item.skill / 100) * BAR_MAX_WIDTH,
            zIndex: -1,
            backgroundColor: color2,
            position: 'absolute',
            transformOrigin: 'right',
            right: 0,
            top: 8,
          }}
        /> */}

        <Flipped flipId={createIconFlipId(index)} stagger="item">
          <div
            className="rounded-full p-2"
            css={{
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

        <Flipped flipId={createTextFlipId(index)} stagger="text">
          <div className="text-xs whitespace-no-wrap text-right">
            {item.name}
          </div>
        </Flipped>
      </div>
    </li>
  )
}

type HorizontalItemProps = {
  index: number
  item: any
}
function HorizontalItem({ index, item }: HorizontalItemProps) {
  return (
    <li>
      <Flipped flipId={createIconFlipId(index)} stagger="item">
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
    </li>
  )
}

type SkillsProps = {
  resume: ResumeSchema
}
function Skills({ resume }: SkillsProps) {
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
        className={classNames('flex', {
          'flex-col': isVertical,
          'flex-row-reverse': !isVertical,
        })}
        onClick={isVertical ? handleCollapse : handleExpand}
      >
        {isVertical && (
          <AiOutlineClose className="cursor-pointer" onClick={handleCollapse} />
        )}

        {skills
          .map((item, index) => {
            if (isVertical) {
              const parent = (
                <VerticalItem
                  key={item.name}
                  item={item}
                  index={index}
                  onClick={isVertical ? handleClickItem : undefined}
                  isOpen={openStates[index]}
                />
              )
              const children = openStates[index]
                ? item.keywords.map(keyword => (
                    <SubItem key={keyword} index={index} keyword={keyword} />
                  ))
                : []
              return [parent, ...children]
            } else {
              return (
                <HorizontalItem key={item.name} item={item} index={index} />
              )
            }
          })
          .flat()}
      </ul>
    </Flipper>
  )
}

export default Skills
