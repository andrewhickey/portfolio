import * as React from 'react'
import { Layout, Timeline, Header } from '../components'
import { resume } from '../constants'

const IndexPage = () => (
  <Layout>
    <Header resume={resume} />
    <Timeline resume={resume} />
  </Layout>
)

export default IndexPage
