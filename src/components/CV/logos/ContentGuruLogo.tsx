import * as React from 'react'
import styled from 'styled-components'
import cgImgSrc from './contentguru-logo.png'

const Img = styled.img`
  margin-bottom: 0;
`

const ContentGuruLogo = (props: React.ImgHTMLAttributes<HTMLImageElement>) => (
  <Img src={cgImgSrc} alt="Content Guru" {...props} />
)

export default ContentGuruLogo
