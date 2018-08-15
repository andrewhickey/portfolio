import * as React from 'react'
import SkillItem from './SkillItem'
import ReactLogo from './logos/ReactLogo'
import WebPackLogo from './logos/WebPackLogo'
import ReduxLogo from './logos/ReduxLogo'
import MobxLogo from './logos/MobxLogo'
import MongoDBLogo from './logos/MongoDBLogo'
import MySQLLogo from './logos/MySQLLogo'
import ApacheBeamLogo from './logos/ApacheBeamLogo'
import JestLogo from './logos/JestLogo'

const Technologies = () => (
  <div>
    <SkillItem logo={<ReactLogo />} level={100}>
      React
    </SkillItem>
    <SkillItem logo={<ReduxLogo />} level={100}>
      Redux
    </SkillItem>
    <SkillItem logo={<WebPackLogo />} level={97}>
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
    <SkillItem logo={<ApacheBeamLogo />} level={50}>
      Apache Beam
    </SkillItem>
  </div>
)

export default Technologies
