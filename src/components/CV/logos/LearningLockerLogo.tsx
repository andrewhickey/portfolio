import * as React from 'react'
import styled from 'styled-components'
import llImgSrc from './ll-logo.png'

const Img = styled.img`
  margin-bottom: 0;
`

const LearningLockerLogo = (
  props: React.ImgHTMLAttributes<HTMLImageElement>
) => <Img src={llImgSrc} alt="Learning Locker" {...props} />

export default LearningLockerLogo
