import * as React from 'react'
import { Link } from 'gatsby'
import Layout from '../components/Layout'
import AnimatedButton from '../components/AnimatedButton'
import styled from 'styled-components'
import { rhythm } from '../utils/typography'
import ProfilePic from '../components/ProfilePic'

const AboutContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow: auto;
  text-align: center;
  flex: 1;
`

const SiteAbout = styled.h1`
  margin: ${rhythm(1)};
  font-size: 4rem;
  line-height: 4rem;
  & a:hover {
    text-decoration: none;
  }
`

const LinkContainer = styled.div`
  align-items: flex-end;
  display: flex;
  justify-content: space-around;
  flex: 1;
  width: 100%;
`

const IndexPage = () => (
  <Layout>
    <AboutContainer>
      <ProfilePic />
      <SiteAbout>
        <Link to="/">Andrew Hickey</Link>
      </SiteAbout>
      <h2>Full stack pancake developer</h2>
      <LinkContainer>
        <Link to="/portfolio/">
          <AnimatedButton>PORTFOLIO</AnimatedButton>
        </Link>
        <Link to="/resume/">
          <AnimatedButton>RESUME</AnimatedButton>
        </Link>
        <Link to="/contact/">
          <AnimatedButton>CONTACT</AnimatedButton>
        </Link>
      </LinkContainer>
    </AboutContainer>
  </Layout>
)

export default IndexPage
