import * as React from 'react'
import Layout from '../components/Layout'
import styled from 'styled-components'
import Menu from '../components/Menu'
import { rhythm } from '../utils/typography'
import { color2 } from '../utils/colors'
import Column from '../components/layout/Column'
import Obstacle from '../components/Obstacle'

const Title = styled.h1`
  color: black;
  font-size: 3rem;
  line-height: 3rem;
  margin: 0;
  margin-bottom: 0.8rem;
  display: inline-block;
`

const Name = styled.span`
  color: ${color2};
  font-size: 4rem;
  font-weight: bold;
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
  width: 992px;
  flex: 1;
`

const IndexPage = () => (
  <Layout>
    <Menu />
    <PaddedColumn>
      <div>
        <Obstacle obstacleId="ob1">
          {({ ref }) => (
            <Title innerRef={ref}>
              Hi, I'm <Name>Andrew</Name>
            </Title>
          )}
        </Obstacle>
        <Obstacle obstacleId="ob2">
          {({ ref }) => (
            <SubTitle innerRef={ref}>
              full stack, contract, web developer
            </SubTitle>
          )}
        </Obstacle>
      </div>
    </PaddedColumn>
  </Layout>
)

export default IndexPage
