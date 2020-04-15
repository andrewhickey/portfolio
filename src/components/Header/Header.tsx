import * as React from 'react'
import { ResumeSchema } from '../../types/ResumeSchema'
import ProfilePic from '../ProfilePic'
import { color2, color1, color3 } from '../../utils/colors'
import { rhythm } from '../../utils/typography'
import { lighten, transparentize, mix } from 'polished'
import { FaMapMarkerAlt } from 'react-icons/fa'
import profilePicSrc from './profile.jpg'
import Skills from '../Skills'

// const stripeColor = transparentize(0.9, '#fff')
const stripeColor = transparentize(0.7, color1)
const stripeColor2 = transparentize(0.1, color2)

// background: `
//   repeating-linear-gradient(45deg, ${stripeColor} 0, ${stripeColor} 20px, transparent 20px, transparent 32px, ${stripeColor} 32px, ${stripeColor} 44px, transparent 44px, transparent 56px, ${stripeColor} 56px, ${stripeColor} 68px, transparent 68px, transparent 80px, ${stripeColor} 0),
//   repeating-linear-gradient(-45deg, ${stripeColor} 0, ${stripeColor} 20px, transparent 20px, transparent 32px, ${stripeColor} 32px, ${stripeColor} 44px, transparent 44px, transparent 56px, ${stripeColor} 56px, ${stripeColor} 68px, transparent 68px, transparent 80px, ${stripeColor} 0),
//   linear-gradient(0deg, ${stripeColor2}, ${stripeColor2})
// `,

type HeaderProps = {
  resume: ResumeSchema
}
function Header({ resume }: HeaderProps) {
  return (
    <div className="md:flex bg-white" css={{ backgroundColor: color1 }}>
      <img
        src={profilePicSrc}
        className="h-16 w-16 md:h-24 md:w-24 rounded-full mx-auto md:mx-0 md:mr-6"
      />
      <div className="text-center md:text-left md:mr-6">
        <h3 className="text-xl">{resume.basics?.name}</h3>
        <p className="mt-6">{resume.basics?.summary}</p>
      </div>
      <div className="flex-1 ">
        <h3 className="text-center mt-6 md:mt-0 md:text-right text-xl whitespace-no-wrap">
          {resume.basics?.location?.city},{' '}
          {resume.basics?.location?.countryCode}{' '}
          <FaMapMarkerAlt className="inline align-bottom" />
        </h3>
        <div className="mt-6">
          <Skills resume={resume} />
        </div>
      </div>
    </div>
  )
}

export default Header
