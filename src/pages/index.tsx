import * as React from 'react'
import { Layout, Timeline } from '../components'
import { resume } from '../constants'

const IndexPage = () => (
  <Layout>
    <Timeline resume={resume} />
  </Layout>
)

export default IndexPage
