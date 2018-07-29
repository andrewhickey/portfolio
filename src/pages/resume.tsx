import * as React from 'react'
import { Link } from 'gatsby'
import Layout from '../components/Layout'
import Menu from '../components/Menu'
import CV from '../components/about/CV'

const About = () => (
  <Layout>
    <Menu />
    <CV />
  </Layout>
)

export default About
