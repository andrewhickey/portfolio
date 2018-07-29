import * as React from 'react'
import launcestonLogoSrc from './launceston-logo.jpg'

const LauncestonLogo = (props: React.ImgHTMLAttributes<HTMLImageElement>) => (
  <img src={launcestonLogoSrc} alt="Launceston College" {...props} />
)

export default LauncestonLogo
