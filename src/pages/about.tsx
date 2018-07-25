import * as React from 'react'
import { Link } from 'gatsby'
import Layout from '../components/Layout'
import Menu from '../components/Menu'

const About = () => (
  <Layout>
    <Menu />
    <h1>About</h1>
    <Link to="/">Go back to the homepage</Link>
  </Layout>
)

export default About
