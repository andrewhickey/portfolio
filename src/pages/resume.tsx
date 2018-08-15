import * as React from 'react'
import { Link } from 'gatsby'
import Layout from '../components/Layout'
import PageColumn from '../components/layout/PageColumn'
import Menu from '../components/Menu'
import CV from '../components/CV'

const About = () => (
  <Layout>
    <Menu />
    <PageColumn>
      <CV />
    </PageColumn>
  </Layout>
)

export default About
