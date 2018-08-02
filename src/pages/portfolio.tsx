import * as React from 'react'
import { Link } from 'gatsby'
import Layout from '../components/Layout'
import Menu from '../components/Menu'
import Column from '../components/layout/Column'
import Row from '../components/layout/Row'
import AlfaPos from '../components/projects/AlfaPos'

const SecondPage = () => (
  <Layout>
    <Menu />
    <Column>
      <Row>
        <AlfaPos />
      </Row>
    </Column>
  </Layout>
)

export default SecondPage
