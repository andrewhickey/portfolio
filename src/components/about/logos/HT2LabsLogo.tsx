import * as React from 'react'
import ht2ImgSrc from './ht2labs-logo.png'

const HT2LabsLogo = (props: React.ImgHTMLAttributes<HTMLImageElement>) => (
  <img src={ht2ImgSrc} alt="HT2 Labs" {...props} />
)

export default HT2LabsLogo
