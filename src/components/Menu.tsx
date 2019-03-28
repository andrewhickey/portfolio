import * as React from 'react'
import styled from 'styled-components'
import Row from './layout/Row'
import { Link } from 'gatsby'
import { rhythm } from '../utils/typography'
import { text } from '../utils/colors'

const MenuLink = styled(Link)`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  white-space: nowrap;
  padding-left: ${rhythm(0.5)};
  padding-right: ${rhythm(0.5)};
`

const HomeLink = styled(MenuLink)`
  border-bottom: 1px solid ${text};
  @media (min-width: 574px) {
    border-right: 1px solid ${text};
    border-bottom: none;
  }
`

const AutoWidthRow = styled(Row)`
  width: auto;
`

const MenuContainer = styled(AutoWidthRow)`
  align-items: center;
  flex-wrap: wrap;
  justify-content: center;
  margin-top: ${rhythm(1)};
  filter: drop-shadow(0 -3px 5px rgba(0, 0, 0, 0.25));
`

const Menu = () => (
  <MenuContainer>
    <HomeLink to="/">ANDREW HICKEY'S WEBSITE</HomeLink>
    <AutoWidthRow>
      <MenuLink to="/contact/">CONTACT</MenuLink>
      <MenuLink to="/resume/">RESUME</MenuLink>
      <MenuLink to="/portfolio/">PORTFOLIO</MenuLink>
    </AutoWidthRow>
  </MenuContainer>
)

export default Menu
