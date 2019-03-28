import * as React from 'react'
import styled from 'styled-components'
import ProfilePic from './ProfilePic'
import Row from './layout/Row'
import { Link } from 'gatsby'
import { rhythm } from '../utils/typography'

const FullWidthRow = Row.extend`
  justify-content: center;
  width: 992px;
  filter: drop-shadow(0 -3px 5px rgba(0, 0, 0, 0.25));
`

const MenuLink = styled(Link)`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  white-space: nowrap;
  padding-left: ${rhythm(0.5)};
  padding-right: ${rhythm(0.5)};
`

const MenuContainer = Row.extend`
  width: auto;
  align-items: center;
  margin-top: ${rhythm(1)};
`

const Menu = () => (
  <FullWidthRow>
    <MenuContainer>
      <MenuLink to="/">ANDREW HICKEY'S WEBSITE</MenuLink>
      {' | '}
      <MenuLink to="/contact/">CONTACT</MenuLink>
      <MenuLink to="/portfolio/">PORTFOLIO</MenuLink>
      <MenuLink to="/resume/">RESUME</MenuLink>
    </MenuContainer>
  </FullWidthRow>
)

export default Menu
