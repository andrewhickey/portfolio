import * as React from 'react'
import learningLockerImgSrc from './learninglocker.png'
import ProjectCard from './ProjectCard'

const LearningLocker = () => (
  <ProjectCard
    src={learningLockerImgSrc}
    title={<a href="https://learninglocker.net">Learning Locker</a>}
  >
    <p>
      An open source, large scale, data storage and analytics tool for the L&D
      industry. <a href="https://learninglocker.net">Learning Locker</a> is used
      to store millions of learning events and use that data to improve people's
      learning experience by offering more relevant courses, helping to improve
      existing material or providing certification.
    </p>
    <p>
      The back end is built with TypeScript running on Node.js and has been
      engineered to scale horizontally allowing for huge volumes of requests. It
      is completely compatible with the{' '}
      <a href="https://github.com/adlnet/xAPI-Spec">xAPI specification</a>. The
      front end is built with React and includes animated visualisations, drag
      and drop dashboards and search and display for millions of records.
    </p>
    <p>
      <b>Tech:</b> TypeScript, MongoDB, React, Redux, D3, CSS modules, Webpack,
      Jest, Enzyme, Cypress
    </p>
  </ProjectCard>
)

export default LearningLocker
