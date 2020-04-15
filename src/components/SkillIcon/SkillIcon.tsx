import * as React from 'react'
import { FaHtml5, FaCss3, FaJs, FaReact } from 'react-icons/fa'
// HTML', 'CSS', 'Javascript'

type SkillIconProps = {
  skill: string
}
function SkillIcon({
  skill,
  ...svgProps
}: SkillIconProps & React.SVGProps<SVGElement>) {
  switch (skill) {
    case 'HTML':
      return <FaHtml5 {...svgProps} />
    case 'CSS':
      return <FaCss3 {...svgProps} />
    case 'Javascript':
      return <FaJs {...svgProps} />
    case 'React':
      return <FaReact {...svgProps} />
    case 'React-Native':
      return <FaReact {...svgProps} />

    default:
      return null
  }
}

export default SkillIcon
