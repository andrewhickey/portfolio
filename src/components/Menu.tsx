import * as React from 'react'
import styled from 'styled-components'
import ProfilePic from './about/ProfilePic'
import Row from './layout/Row'
import { Link } from 'gatsby'
import { rhythm } from '../utils/typography'
import AnimatedButton from '../components/AnimatedButton'

const FullWidthRow = Row.extend`
  justify-content: center;
`

const MenuContainer = Row.extend`
  width: 992px;
  justify-content: space-around;
  align-items: center;
  margin-top: ${rhythm(1)};
`

const Menu = () => (
  <FullWidthRow>
    <MenuContainer>
      <Link to="/portfolio/">PORTFOLIO</Link>
      <Link to="/resume/">RESUME</Link>
      <Link to="/">
        <ProfilePic />
      </Link>
      <Link to="/availability/">AVAILABILITY</Link>
      <Link to="/contact/">CONTACT</Link>
    </MenuContainer>
  </FullWidthRow>
)

export default Menu
