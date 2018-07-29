import * as React from 'react'
import llImgSrc from './ll-logo.png'

const LearningLockerLogo = (
  props: React.ImgHTMLAttributes<HTMLImageElement>
) => <img src={llImgSrc} alt="Learning Locker" {...props} />

export default LearningLockerLogo
