import * as React from 'react'
import Link from 'gatsby-link'
import AnimatedButton from '../components/AnimatedButton'
import Layout from '../components/Layout'

const IndexPage = () => (
  <Layout>
    <AnimatedButton />
    <Link to="/page-2/">Go to page 2</Link>
  </Layout>
)

export default IndexPage
