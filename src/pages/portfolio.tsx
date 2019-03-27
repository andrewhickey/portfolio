import * as React from 'react'
import Layout from '../components/Layout'
import Menu from '../components/Menu'
import Otro from '../components/projects/Otro'
import AlfaPos from '../components/projects/AlfaPos'
import PageColumn from '../components/layout/PageColumn'
import LearningLocker from '../components/projects/LearningLocker'
import OrganisationDesign from '../components/projects/OrganisationDesign'

const SecondPage = () => (
  <Layout>
    <Menu />
    <PageColumn>
      <Otro />
      <AlfaPos />
      <LearningLocker />
      <OrganisationDesign />
    </PageColumn>
  </Layout>
)

export default SecondPage
