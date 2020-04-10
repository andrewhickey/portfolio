import * as React from 'react'
import { Layout, Timeline } from '../components'
import { resume } from '../constants'

const IndexPage = () => (
  <Layout>
    <div data-testid="home-content">
      <Timeline resume={resume} />
    </div>
  </Layout>
)

export default IndexPage
