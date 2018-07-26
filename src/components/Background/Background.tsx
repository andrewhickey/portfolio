import * as React from 'react'
import styled from 'styled-components'
import ScrollPosition from '../ScrollPosition'
import { color2, color3 } from '../../utils/colors'
import backgroundSrc from './lines.png'

const BackgroundDiv = styled.div`
  position: absolute;
  z-index: -1;
  width: 100%;
  height: 100%;
  background-image: url('https://www.transparenttextures.com/patterns/light-paper-fibers.png'),
    linear-gradient(to bottom, #d4e1f1, #dadada);
`

const Background = () => <BackgroundDiv />

export default Background
