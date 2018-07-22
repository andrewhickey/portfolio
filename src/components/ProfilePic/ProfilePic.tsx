import styled from 'styled-components'
import profilePicSrc from './profile.jpg'
import { rhythm } from '../../utils/typography'

const ProfilePic = styled.div`
  background-image: url(${profilePicSrc});
  background-size: cover;
  height: ${rhythm(4)};
  width: ${rhythm(4)};
  border-radius: 50%;
`

export default ProfilePic
