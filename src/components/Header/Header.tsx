import * as React from 'react'
import { ResumeSchema } from '../../types/ResumeSchema'
import ProfilePic from '../ProfilePic'
import { color2 } from '../../utils/colors'

type HeaderProps = {
  resume: ResumeSchema
}
function Header({ resume }: HeaderProps) {
  return (
    <div
      css={{
        backgroundColor: color2,
      }}
    >
      <ProfilePic />
    </div>
  )
}

export default Header
