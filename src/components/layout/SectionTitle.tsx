import * as React from 'react'
import styled from 'styled-components'
import Row from '../layout/Row'
import { rhythm } from '../../utils/typography'
import { color2 } from '../../utils/colors'

const SectionRow = Row.extend`
  align-items: center;
`
const SectionHeader = styled.h1`
  color: ${color2};
`

const LargeSectionHeader = SectionHeader.extend`
  flex: 1;
`
const SectionLine = styled.div`
  border-bottom: 0.2rem solid ${color2};
  margin-left: ${rhythm(0.5)};
  height: ${rhythm(0.5)};
`
interface SectionHeaderProps {
  children: React.ReactNode
}

const SectionTitle = ({ children }: SectionHeaderProps) => (
  <SectionRow>
    <SectionHeader>{children}</SectionHeader>
    <LargeSectionHeader>
      <SectionLine />
    </LargeSectionHeader>
  </SectionRow>
)

export default SectionTitle
