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
      <p>
        email:{' '}
        <b>
          <a href={`mailto:${EMAIL}`}>{EMAIL}</a>
        </b>
      </p>
      <p>
        company name: <b>ANDREW HICKEY LTD</b>
      </p>
      <p>
        company number: <b>11508782</b>
      </p>
    </PageColumn>
  </Layout>
)

export default Contact
