import * as React from 'react'
import styled from 'styled-components'
import { Link } from 'gatsby'
import { rhythm } from '../utils/typography'
import { text } from '../utils/colors'

const PageLink = styled(Link)`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  white-space: nowrap;
  color: ${text};
  padding-left: ${rhythm(0.5)};
  padding-right: ${rhythm(0.5)};
`

const HomeLink = styled(PageLink)`
  grid-area: home;
  border-bottom: 1px solid ${text};
  @media (min-width: 574px) {
    border-bottom: none;
  }
`

const MenuContainer = styled.div`
  margin-top: ${rhythm(1)};
  display: grid;

  grid-template-areas: 'home home home';
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-rows: auto;

  @media (min-width: 574px) {
    grid-template-areas: 'home';
    grid-template-columns: auto auto auto auto auto;
  }

  filter: drop-shadow(0 -3px 5px rgba(0, 0, 0, 0.25));
`

const Divider = styled.div`
  display: none;

  @media (min-width: 574px) {
    display: block;
  }
`

const activeStyle = {
  fontWeight: 'bold',
}

const Menu = () => (
  <MenuContainer>
    <HomeLink to="/" activeStyle={activeStyle}>
      ANDREW HICKEY'S WEBSITE
    </HomeLink>
    <Divider>|</Divider>
    <PageLink to="/contact/" activeStyle={activeStyle}>
      CONTACT
    </PageLink>
    <PageLink to="/resume/" activeStyle={activeStyle}>
      RESUME
    </PageLink>
    <PageLink to="/portfolio/" activeStyle={activeStyle}>
      PORTFOLIO
    </PageLink>
  </MenuContainer>
)

export default Menu
