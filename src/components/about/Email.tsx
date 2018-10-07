import * as React from 'react'
import Obstacle from '../Obstacle'

const Email = () => (
  <Obstacle obstacleId="email">
    {({ ref }) => <h1 ref={ref}>email: andrewhickey@live.co.uk</h1>}
  </Obstacle>
)

export default Email
