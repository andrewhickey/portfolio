import * as React from 'react'
import { Link } from 'gatsby'
import Menu from '../components/Menu'
import Layout from '../components/Layout'

const SecondPage = () => (
  <Layout>
    <Menu />
    <h1>Availability</h1>
    <Link to="/">Go back to the homepage</Link>
  </Layout>
)

export default SecondPage
