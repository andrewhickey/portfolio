import * as React from 'react'
import { Link } from 'gatsby'
import Layout from '../components/Layout'
import Menu from '../components/Menu'
import PageColumn from '../components/layout/PageColumn'
import Email from '../components/about/Email'

const Contact = () => (
  <Layout>
    <Menu />
    <PageColumn>
      <Email />

      <p>company name : company number</p>
    </PageColumn>
  </Layout>
)

export default Contact
