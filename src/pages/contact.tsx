import * as React from 'react'
import { Link } from 'gatsby'
import Layout from '../components/Layout'
import Menu from '../components/Menu'
import PageColumn from '../components/layout/PageColumn'
import { EMAIL } from '../constants'

const Contact = () => (
  <Layout>
    <Menu />
    <PageColumn>
      <h1>email: {EMAIL}</h1>
      <p>company name : company number</p>
    </PageColumn>
  </Layout>
)

export default Contact
