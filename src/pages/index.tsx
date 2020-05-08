import * as React from 'react'
import { Layout, Timeline, Header, Skills } from '../components'
import { resume } from '../constants'

const IndexPage = () => (
  <Layout>
    <div className="p-6">
      <Header resume={resume} />
    </div>

    {/* <Timeline resume={resume} /> */}
  </Layout>
)

export default IndexPage
