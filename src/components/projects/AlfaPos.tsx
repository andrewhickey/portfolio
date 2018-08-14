import * as React from 'react'
import autoposImgSrc from './autopos.png'
import ProjectCard from './ProjectCard'

const AlfaPos = () => (
  <ProjectCard
    src={autoposImgSrc}
    title={
      <a href="https://www.alfasystems.com/eu/media/about-point-of-sale-in-alfa-systems">
        Alfa Point of Sale
      </a>
    }
  >
    <p>
      A closed source single page application used in car dealerships to create
      finance deals. Connected to the core Alfa Systems back end through an
      OCaml proxy.
    </p>
    <p>
      The core of the application was extracted into a component library
      enabling custom implementations to be created with minimal work.
    </p>
    <p>
      <b>Tech:</b> Webpack, React, Redux, Jest, Enzyme, Styled Components,
      Storybook, Material-UI
    </p>
  </ProjectCard>
)

export default AlfaPos
