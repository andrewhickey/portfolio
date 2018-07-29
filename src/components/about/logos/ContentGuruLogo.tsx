import * as React from 'react'
import cgImgSrc from './contentguru-logo.png'

const ContentGuruLogo = (props: React.ImgHTMLAttributes<HTMLImageElement>) => (
  <img src={cgImgSrc} alt="Content Guru" {...props} />
)

export default ContentGuruLogo
