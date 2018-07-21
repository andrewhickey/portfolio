import * as React from 'react'
import styled from 'styled-components'
import ScrollPosition from './ScrollPosition'

const Background = () => (
  <ScrollPosition>{({ scrollY }) => <div>{scrollY}</div>}</ScrollPosition>
)

export default Background
