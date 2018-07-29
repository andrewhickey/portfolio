import * as React from 'react'
import mancLogoImgSrc from './manc-logo.png'

const MancUniLogo = (props: React.ImgHTMLAttributes<HTMLImageElement>) => (
  <img src={mancLogoImgSrc} alt="Manchester University" {...props} />
)

export default MancUniLogo
