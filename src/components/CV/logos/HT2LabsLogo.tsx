import * as React from 'react'
import styled from 'styled-components'
import ht2ImgSrc from './ht2labs-logo.png'

const Img = styled.img`
  margin-bottom: 0;
`

const HT2LabsLogo = (props: React.ImgHTMLAttributes<HTMLImageElement>) => (
  <Img src={ht2ImgSrc} alt="HT2 Labs" {...props} />
)

export default HT2LabsLogo
