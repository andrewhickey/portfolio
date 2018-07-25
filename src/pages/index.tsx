import * as React from 'react'
import { Link } from 'gatsby'
import Layout from '../components/Layout'
import AnimatedButton from '../components/AnimatedButton'
import styled from 'styled-components'
import Menu from '../components/Menu'
import { rhythm } from '../utils/typography'
import { text, color5 } from '../utils/colors'
import ProfilePic from '../components/about/ProfilePic'
import Technologies from '../components/about/Technologies'
import Column from '../components/layout/Column'
import Row from '../components/layout/Row'
import Languages from '../components/about/Languages'

const Title = styled.h1`
  color: black;
  font-size: 3rem;
  margin: 0;
  margin-bottom: 0.8rem;
`

const SubTitle = styled.h1`
  margin-top: 0;
  padding-left: ${rhythm(1)};
  border-top: 0.2rem solid black;
`

const PaddedColumn = Column.extend`
  align-items: center;
  justify-content: space-around;
  padding: ${rhythm(2)};
  flex: 1;
`

const SkillsRow = Row.extend`
  justify-content: space-around;
`

const IndexPage = () => (
  <Layout>
    <Menu />
    <PaddedColumn>
      <div>
        <Title>Andrew Hickey</Title>
        <SubTitle>full stack, contract, web developer</SubTitle>
      </div>
      <SkillsRow>
        <Technologies />
        <Languages />
      </SkillsRow>
    </PaddedColumn>
  </Layout>
)

export default IndexPage
