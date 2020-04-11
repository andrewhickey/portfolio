import * as React from 'react'
import { FaHtml5, FaCss3, FaJs } from 'react-icons/fa'
// HTML', 'CSS', 'Javascript'

type SkillIconProps = {
  skill: string
}
function SkillIcon({ skill }: SkillIconProps) {
  switch (skill) {
    case 'HTML':
      return <FaHtml5 />
    case 'CSS':
      return <FaCss3 />
    case 'Javascript':
      return <FaJs />

    default:
      return null
  }
}

export default SkillIcon
