import * as React from 'react'
import { Link } from 'gatsby'
import Layout from '../components/Layout'
import AnimatedButton from '../components/AnimatedButton'
import styled from 'styled-components'
import Menu from '../components/Menu'
import { rhythm } from '../utils/typography'
import ProfilePic from '../components/about/ProfilePic'
import Technologies from '../components/about/Technologies'
import Column from '../components/layout/Column'
import Row from '../components/layout/Row'

const Black = styled.span`
  color: black;
`

const BottomColumn = Column.extend`
  align-items: flex-end;
  justify-content: flex-end;
`

const IndexPage = () => (
  <Layout>
    <Menu />
    <Row>
      <Column>
        <h1>
          <Black>Andrew Hickey</Black>, full stack contract web developer
        </h1>
      </Column>
    </Row>
  </Layout>
)

export default IndexPage
