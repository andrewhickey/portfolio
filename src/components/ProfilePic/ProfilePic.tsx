import profilePicSrc from './profile.jpg'
import { rhythm } from '../../utils/typography'
import { color1 } from '../../utils/colors'
import styled from '@emotion/styled'

const ProfilePic = styled.div`
  background-image: url(${profilePicSrc});
  background-size: cover;
  height: ${rhythm(4)};
  width: ${rhythm(4)};
  border-radius: 50%;
  /* border: 4px solid ${color1}; */
`
export default ProfilePic
