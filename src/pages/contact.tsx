import * as React from 'react'
import styled from 'styled-components'
import Bio from '../components/Bio'
import ProfilePic from '../components/ProfilePic'
import Layout from '../components/Layout'
import Menu from '../components/Menu'
import PageColumn from '../components/layout/PageColumn'
import { EMAIL, LINKEDIN } from '../constants'
import { rhythm } from '../utils/typography'

const CenteredProfilePic = styled(ProfilePic)`
  align-self: center;
  margin-bottom: ${rhythm(1)};
  margin-top: ${rhythm(1)};
`

const Contact = () => (
  <Layout>
    <Menu />
    <PageColumn>
      <CenteredProfilePic />
      <Bio />
      <p>
        <i>email:</i> <a href={`mailto:${EMAIL}`}>{EMAIL}</a>
      </p>
      <p>
        <i>linkedin:</i> <a href={LINKEDIN}>{LINKEDIN}</a>
      </p>
      <p>
        <i>company name:</i> <b>ANDREW HICKEY LTD</b>
      </p>
      <p>
        <i>company number:</i> <b>11508782</b>
      </p>
    </PageColumn>
  </Layout>
)

export default Contact
