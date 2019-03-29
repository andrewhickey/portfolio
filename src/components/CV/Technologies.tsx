import * as React from 'react'
import SkillItem from './SkillItem'
import ReactLogo from './logos/ReactLogo'
import WebpackLogo from './logos/WebpackLogo'
import ReduxLogo from './logos/ReduxLogo'
import MobxLogo from './logos/MobxLogo'
import MongoDBLogo from './logos/MongoDBLogo'
import MySQLLogo from './logos/MySQLLogo'
import JestLogo from './logos/JestLogo'

const Technologies = () => (
  <div>
    <SkillItem logo={<ReactLogo />} level={100}>
      React
    </SkillItem>
    <SkillItem logo={<ReduxLogo />} level={100}>
      Redux
    </SkillItem>
    <SkillItem logo={<WebpackLogo />} level={97}>
      Webpack
    </SkillItem>
    <SkillItem logo={<MongoDBLogo />} level={95}>
      MongoDB
    </SkillItem>
    <SkillItem logo={<JestLogo />} level={93}>
      Jest
    </SkillItem>
    <SkillItem logo={<MySQLLogo />} level={85}>
      MySQL
    </SkillItem>
    <SkillItem logo={<MobxLogo />} level={70}>
      MobX
    </SkillItem>
  </div>
)

export default Technologies
