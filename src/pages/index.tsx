import * as React from 'react'
import Layout from '../components/Layout'
import { Timeline } from '../components'

const IndexPage = () => (
  <Layout>
    <div data-testid="home-content">
      <Timeline />
    </div>
  </Layout>
)

export default IndexPage
