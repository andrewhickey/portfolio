import * as React from 'react'
import {
  FaHtml5,
  FaCss3,
  FaJs,
  FaReact,
  FaNodeJs,
  FaMobileAlt,
  FaCodeBranch,
  FaApple,
  FaPython,
  FaAws,
  FaMicrosoft,
} from 'react-icons/fa'
import { MdWeb } from 'react-icons/md'
import { BsBraces } from 'react-icons/bs'
import { DiMongodb, DiAndroid, DiGoogleCloudPlatform } from 'react-icons/di'
import {
  AiOutlineCloudServer,
  AiOutlineCiCircle,
  AiOutlineConsoleSql,
} from 'react-icons/ai'
import { FiServer } from 'react-icons/fi'

type SkillIconProps = {
  skill: string
}
function SkillIcon({
  skill,
  ...svgProps
}: SkillIconProps & React.SVGProps<SVGElement>) {
  switch (skill) {
    case 'Web Front-End':
      return <MdWeb {...svgProps} />
    case 'Web Back-End':
      return <FiServer {...svgProps} />
    case 'DevOps':
      return <AiOutlineCloudServer {...svgProps} />
    case 'Native':
      return <FaMobileAlt {...svgProps} />
    case 'Software Engineering':
      return <BsBraces {...svgProps} />
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
    case 'Node.js':
      return <FaNodeJs {...svgProps} />
    case 'MongoDB':
      return <DiMongodb {...svgProps} />
    case 'Android':
      return <DiAndroid {...svgProps} />
    case 'iOS':
      return <FaApple {...svgProps} />
    case 'Git':
      return <FaCodeBranch {...svgProps} />
    case 'Python':
      return <FaPython {...svgProps} />
    case 'CI':
      return <AiOutlineCiCircle {...svgProps} />
    case 'GCP':
      return <DiGoogleCloudPlatform {...svgProps} />
    case 'AWS':
      return <FaAws {...svgProps} />
    case 'Azure':
      return <FaMicrosoft {...svgProps} />
    case 'SQL':
      return <AiOutlineConsoleSql {...svgProps} />

    default:
      return null
  }
}

export default SkillIcon
