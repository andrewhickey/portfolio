import * as React from 'react'
import orgdesignImgSrc from './bporgdesign.png'
import ProjectCard from './ProjectCard'

const OrganisationDesign = () => (
  <ProjectCard src={orgdesignImgSrc} title="BP Organisation Design">
    <p>
      A single page application used in car dealerships to create finance deals.
    </p>
    <p>
      <b>Tech:</b> Webpack, React, Redux, Jest, Enzyme, Styled Components,
      Storybook, Material-UI
    </p>
  </ProjectCard>
)

export default OrganisationDesign
