import * as React from 'react'
import WebpackLogo from './logos/WebpackLogo'
import ReactLogo from './logos/ReactLogo'
import ReduxLogo from './logos/ReduxLogo'
import MobxLogo from './logos/MobxLogo'
import MongoDBLogo from './logos/MongoDBLogo'
import MySQLLogo from './logos/MySQLLogo'
import ApacheBeamLogo from './logos/ApacheBeamLogo'
import styled, { css } from 'styled-components'
import { color3 } from '../../../utils/colors'
import { rhythm } from '../../../utils/typography'

const SkillList = styled.ul`
  list-style: none;
  text-align: left;
`

const SkillItem = styled.li`
  padding: 0 ${rhythm(0.5)};
  background-color: ${color3};
`

const Technologies = () => (
  <SkillList>
    <SkillItem>React</SkillItem>
    <SkillItem>Webpack</SkillItem>
    <SkillItem>Redux</SkillItem>
    <SkillItem>MobX</SkillItem>
    <SkillItem>MongoDB</SkillItem>
    <SkillItem>MySQL</SkillItem>
    <SkillItem>Apache Beam</SkillItem>
  </SkillList>
)

export default Technologies
