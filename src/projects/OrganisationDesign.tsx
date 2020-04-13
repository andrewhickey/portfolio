import * as React from 'react'
import orgdesignImgSrc from './bporgdesign.png'
import ProjectCard from './ProjectCard'

const OrganisationDesign = () => (
  <ProjectCard src={orgdesignImgSrc} title="BP Organisation Design">
    <p>
      A closed source social learning website for sharing organisation design
      knowlege and expertise inside BP. Allows users to pin frequently used
      articles to their custom homepage and discover other colleagues who are
      experts in a particular field.
    </p>
    <p>
      The back end is built in PHP using Laravel connected to a MySQL DB. The
      front end is statically rendered and then enhanced with Marionette.js
    </p>
    <p>
      <b>Tech:</b> PHP, Laravel, MySQL, Marionette, Backbone
    </p>
  </ProjectCard>
)

export default OrganisationDesign
