import * as React from 'react'
import { Link } from 'gatsby'
import styled from 'styled-components'
import { rhythm } from '../utils/typography'

const HeaderLink = styled(Link)`
  text-decoration: none;
  margin: 0 ${rhythm(1)};
`

interface HeaderProps {
  siteTitle: string
}
const Header = ({ siteTitle }: HeaderProps) => (
  <div>
    <div
      style={{
        margin: '0 auto',
        maxWidth: 960,
      }}
    >
      <h1>
        <HeaderLink to="/">{siteTitle}</HeaderLink>
      </h1>
    </div>
  </div>
)

export default Header
