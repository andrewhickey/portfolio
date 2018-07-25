import * as React from 'react'
import styled from 'styled-components'
import ProfilePic from './about/ProfilePic'
import Row from './layout/Row'
import { Link } from 'gatsby'
import AnimatedButton from '../components/AnimatedButton'

const FullWidthRow = Row.extend`
  width: 100%;
  justify-content: center;
`

const MenuContainer = Row.extend`
  width: 1000px;
  justify-content: center;
`

const Menu = () => (
  <FullWidthRow>
    <MenuContainer>
      <Link to="/portfolio/">PORTFOLIO</Link>
      <Link to="/resume/">RESUME</Link>
      <ProfilePic />
      <Link to="/availability/">AVAILABILITY</Link>
      <Link to="/contact/">CONTACT</Link>
    </MenuContainer>
  </FullWidthRow>
)

export default Menu
