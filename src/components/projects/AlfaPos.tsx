import * as React from 'react'
import autoposImgSrc from './autopos.png'
import ProjectCard from './ProjectCard'

const AlfaPos = () => (
  <ProjectCard src={autoposImgSrc} title="Alfa Point of Sale">
    <p>
      A single page application used in car dealerships to create finance deals.
    </p>
    <p>
      <b>Tech:</b> Webpack, React, Redux, Jest, Enzyme, Styled Components,
      Storybook, Material-UI
    </p>
  </ProjectCard>
)

export default AlfaPos
