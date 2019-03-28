import * as React from 'react'
import styled, { css } from 'styled-components'
import { text, color3 } from '../../utils/colors'
import { rhythm } from '../../utils/typography'
import Row from '../layout/Row'
import { lighten } from 'polished'

const ProgressContainer = styled.div`
  flex: 1;
  background-color: ${lighten(0.5, text)};
`
interface ProgressProps {
  level: number
}
const Progress = styled.div`
  width: ${(props: ProgressProps) => props.level}%;
  background-color: ${color3};
  padding: 0 ${rhythm(0.5)};
  white-space: nowrap;
`

const LogoContainer = Row.extend`
  width: 3.5rem;
  height: 2.5rem;
  padding-right: ${rhythm(0.5)};
  margin-right: ${rhythm(0.5)};
  border-right: 0.2rem solid ${text};

  & svg {
    height: 100%;
    width: 100%;
  }
`
const SkillItemContainter = Row.extend`
  margin-bottom: ${rhythm(0.5)};
  align-items: center;
`

interface SkillItemProps {
  logo: React.ReactNode
  children: React.ReactNode
  level?: number
}
const SkillItem = ({ logo, children, level = 0 }: SkillItemProps) => (
  <SkillItemContainter>
    <LogoContainer>{logo}</LogoContainer>
    <ProgressContainer>
      <Progress level={level}>{children}</Progress>
    </ProgressContainer>
  </SkillItemContainter>
)

export default SkillItem
