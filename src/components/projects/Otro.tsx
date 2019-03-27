import * as React from 'react'
import otroImgSrc from './otro.png'
import ProjectCard from './ProjectCard'

const Otro = () => (
  <ProjectCard
    src={otroImgSrc}
    title={<a href="https://app.otro.com/">Otro</a>}
  >
    <p>
      A high profile social media and exclusive content website for football
      fans. Built in collaboration with some of the world's best known
      footballers, e.g. Lionel Messi, David Beckham and Neymar Jr.
    </p>
    <p>
      A web and mobile version were developed in parallel using React and
      React-Native.
    </p>
    <p>
      <b>Tech:</b> Webpack, React, React-Native, Redux, Jest, Enzyme, Styled
      Components, Storybook
    </p>
  </ProjectCard>
)

export default Otro
