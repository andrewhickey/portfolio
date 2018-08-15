import * as React from 'react'
import SkillItem from './SkillItem'
import JavaScriptLogo from './logos/JavaScriptLogo'
import TypeScriptLogo from './logos/TypeScriptLogo'
import JavaLogo from './logos/JavaLogo'
import PhpLogo from './logos/PhpLogo'
import RustLogo from './logos/RustLogo'
import WebPackLogo from './logos/WebPackLogo'
import ReduxLogo from './logos/ReduxLogo'
import MongoDBLogo from './logos/MongoDBLogo'

const Languages = () => (
  <div>
    <SkillItem logo={<JavaScriptLogo />} level={98}>
      JavaScript
    </SkillItem>
    <SkillItem logo={<TypeScriptLogo />} level={85}>
      TypeScript
    </SkillItem>
    <SkillItem logo={<PhpLogo />} level={75}>
      PHP
    </SkillItem>
    <SkillItem logo={<JavaLogo />} level={60}>
      Java
    </SkillItem>
    <SkillItem logo={<RustLogo />} level={40}>
      Rust
    </SkillItem>
  </div>
)

export default Languages
