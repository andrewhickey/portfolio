import * as React from 'react'
import styled from 'styled-components'
import { rhythm } from '../../utils/typography'

const SectionHeader = styled.h3`
  text-transform: uppercase;
`

const SectionLine = styled.div`
  border-top: 0.2rem solid;
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
