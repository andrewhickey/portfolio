import * as React from 'react'
import { Link } from 'gatsby'
import Layout from '../components/Layout'
import AnimatedButton from '../components/AnimatedButton'
import styled from 'styled-components'
import { rhythm } from '../utils/typography'
import ProfilePic from '../components/about/ProfilePic'
import Technologies from '../components/about/Technologies'

const Row = styled.div`
  display: flex;
`

const Column = styled.div`
  display: flex;
  flex-direction: column;
  padding: ${rhythm(1)};
`

const LinkContainer = styled.div`
  align-items: flex-end;
  display: flex;
  justify-content: center;
  flex: 1;
  width: 100%;
  & > * {
    margin: 0 ${rhythm(1)};
  }
`

const IndexPage = () => (
  <Layout>
    <Row>
      <Column>
        <Link to="/portfolio/">
          <AnimatedButton>PORTFOLIO</AnimatedButton>
        </Link>
        <Link to="/resume/">
          <AnimatedButton>RESUME</AnimatedButton>
        </Link>
        <Link to="/contact/">
          <AnimatedButton>CONTACT</AnimatedButton>
        </Link>
      </Column>
      <Column>
        <ProfilePic />
        <h1>Andrew Hickey, full stack contract web developer</h1>
        <Technologies />
      </Column>
    </Row>
  </Layout>
)

export default IndexPage
