import styled from 'styled-components'
import profilePicSrc from './profile.jpg'
import { rhythm } from '../../../utils/typography'
import { color2 } from '../../../utils/colors'

const borderWidth = 9

const ProfilePic = styled.div`
  background-image: url(${profilePicSrc});
  background-size: cover;
  height: ${rhythm(4)};
  width: ${rhythm(4)};
  border-radius: 50%;
  box-shadow: 0 0 0 ${borderWidth / 2}px #fff, 0 0 0 ${borderWidth}px ${color2};
  margin: ${borderWidth}px;
`

export default ProfilePic
