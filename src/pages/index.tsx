import * as React from 'react'
import { Link } from 'gatsby'
import Layout from '../components/Layout'
import AnimatedButton from '../components/AnimatedButton'

const IndexPage = () => (
  <Layout>
    <div>
      <AnimatedButton />
    </div>
    <Link to="/page-2/">Go to page 2</Link>
  </Layout>
)

export default IndexPage
