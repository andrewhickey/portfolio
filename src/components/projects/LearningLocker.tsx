import * as React from 'react'
import learningLockerImgSrc from './learninglocker.png'
import ProjectCard from './ProjectCard'

const LearningLocker = () => (
  <ProjectCard src={learningLockerImgSrc} title="Learning Locker">
    <p>
      A single page application used in car dealerships to create finance deals.
    </p>
    <p>
      <b>Tech:</b> Webpack, React, Redux, Jest, Enzyme, Styled Components,
      Storybook, Material-UI
    </p>
  </ProjectCard>
)

export default LearningLocker
