import * as React from 'react'
import styled from 'styled-components'
import { rhythm } from '../../utils/typography'
import { text } from '../../utils/colors'

const SectionHeader = styled.h3`
  text-transform: uppercase;
  a {
    color: ${text};
  }
`

const SectionLine = styled.div`
  border-top: 0.2rem solid;
  height: ${rhythm(0.5)};
  width: 100%;
`

interface SectionHeaderProps {
  children: React.ReactNode
}

const SectionTitle = ({ children, ...props }: SectionHeaderProps) => (
  <div {...props}>
    <SectionHeader>
      {children}
      <SectionLine />
    </SectionHeader>
  </div>
)

export default SectionTitle
