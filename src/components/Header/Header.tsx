import * as React from 'react'
import { ResumeSchema } from '../../types/ResumeSchema'
import ProfilePic from '../ProfilePic'
import { color2, color1 } from '../../utils/colors'
import { rhythm } from '../../utils/typography'
import { lighten } from 'polished'

const transparentWhite = 'rgba(255, 255, 255, 0.05)'

type HeaderProps = {
  resume: ResumeSchema
}
function Header({ resume }: HeaderProps) {
  return (
    <div
      css={{
        display: 'flex',
        alignItems: 'center',
        padding: `${rhythm(2)} ${rhythm(2)}`,
        backgroundImage: `
          repeating-linear-gradient(45deg, ${transparentWhite} 0, ${transparentWhite} 20px, transparent 20px, transparent 32px, ${transparentWhite} 32px, ${transparentWhite} 44px, transparent 44px, transparent 56px, ${transparentWhite} 56px, ${transparentWhite} 68px, transparent 68px, transparent 80px, ${transparentWhite} 0),
          repeating-linear-gradient(-45deg, ${transparentWhite} 0, ${transparentWhite} 20px, transparent 20px, transparent 32px, ${transparentWhite} 32px, ${transparentWhite} 44px, transparent 44px, transparent 56px, ${transparentWhite} 56px, ${transparentWhite} 68px, transparent 68px, transparent 80px, ${transparentWhite} 0),
          linear-gradient(to top right, ${lighten(0.01, color2)}, ${color2})
        `,
      }}
    >
      <ProfilePic css={{ marginRight: rhythm(1) }} />
      <div>
        <h3>{resume.basics?.name}</h3>
        <p>{resume.basics?.summary}</p>
      </div>
      <div></div>
    </div>
  )
}

export default Header
