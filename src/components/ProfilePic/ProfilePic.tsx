import profilePicSrc from './profile.jpg'
import { rhythm } from '../../utils/typography'
import { color1 } from '../../utils/colors'
import styled from '@emotion/styled'

const borderWidth = 4

const ProfilePic = styled.div`
  background-image: url(${profilePicSrc});
  background-size: cover;
  height: ${rhythm(4)};
  width: ${rhythm(4)};
  border-radius: 50%;
  box-shadow: 0 0 0 ${borderWidth}px ${color1},
    0px 0px ${borderWidth * 3}px ${borderWidth}px ${color1};
  margin: ${borderWidth}px;
  transition: all 0.4s;
  &:hover {
    transform: scale(1.05);
  }
`
export default ProfilePic
