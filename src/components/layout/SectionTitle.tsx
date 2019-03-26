import * as React from 'react'
import styled from 'styled-components'
import Row from '../layout/Row'
import { rhythm } from '../../utils/typography'
import { color2 } from '../../utils/colors'

const SectionRow = Row.extend`
  align-items: center;
`
const SectionHeader = styled.h3`
  color: ${color2};
`

const SectionLine = styled.div`
  border-top: 0.2rem solid ${color2};
  height: ${rhythm(0.5)};
  width: 100%;
`
interface SectionHeaderProps {
  children: React.ReactNode
}

const SectionTitle = ({ children }: SectionHeaderProps) => (
  <div>
    <SectionHeader>
      {children}
      <SectionLine />
    </SectionHeader>
  </div>
)

export default SectionTitle
