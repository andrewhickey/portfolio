import * as React from 'react'
import styled from 'styled-components'
import ProfilePic from './ProfilePic'
import Row from './layout/Row'
import { Link } from 'gatsby'
import { rhythm } from '../utils/typography'
import { color3 } from '../utils/colors'
import AnimatedButton from '../components/AnimatedButton'

const FullWidthRow = Row.extend`
  justify-content: center;
  filter: drop-shadow(0 -3px 5px rgba(0, 0, 0, 0.25));
`

const MenuLink = styled(Link)`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
`

const MenuBackground = styled.svg`
  width: 100%;
  height: 100%;
  position: absolute;
  z-index: -1;
  & #background {
    width: 100%;
    height: 100%;
    fill: #fff;
  }

  & #circle-cutout {
    rect {
      fill: #fff;
      width: 100vw;
      height: 100%;
    }
    circle {
      fill: #000;
    }
  }
`

const MenuContainer = Row.extend`
  width: 992px;
  justify-content: space-around;
  align-items: center;
`

const Menu = () => (
  <FullWidthRow>
    <MenuContainer>
      <MenuLink to="/portfolio/">PORTFOLIO</MenuLink>
      <MenuLink to="/resume/">RESUME</MenuLink>
      <MenuLink to="/">
        <ProfilePic />
      </MenuLink>
      <MenuLink to="/availability/">AVAILABILITY</MenuLink>
      <MenuLink to="/contact/">CONTACT</MenuLink>
    </MenuContainer>
    <MenuBackground>
      <defs>
        <mask id="circle-cutout">
          <rect x="0" y="0" width="100%" height="100%" />
          <circle id="mask" cx="50%" cy="70%" r="88" />
        </mask>
      </defs>
      <rect
        x="0"
        y="0"
        width="100%"
        height="100%"
        fill="#ffffff"
        id="background"
        mask="url(#circle-cutout)"
      />
    </MenuBackground>
  </FullWidthRow>
)

export default Menu
