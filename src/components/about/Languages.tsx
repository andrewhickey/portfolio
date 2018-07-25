import * as React from 'react'
import styled, { css } from 'styled-components'
import { rhythm } from '../../utils/typography'

const SkillItem = styled.div`
  padding: 0 ${rhythm(0.5)};
`

const Languages = () => (
  <div>
    <h3>Languages</h3>
    <SkillItem>Javascript</SkillItem>
    <SkillItem>Java</SkillItem>
    <SkillItem>PHP</SkillItem>
    <SkillItem>Rust</SkillItem>
  </div>
)

export default Languages
