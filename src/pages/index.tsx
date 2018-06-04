import * as React from 'react'
import Link from 'gatsby-link'

const IndexPage = () => (
  <div>
    <div>
      <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        <text
          x="0"
          y="0"
          dy="50%"
          style={{ stroke: 'black', fill: 'none', strokeDasharray: '2px' }}
        >
          Grumpy!
        </text>
      </svg>
    </div>
    <Link to="/page-2/">Go to page 2</Link>
  </div>
)

export default IndexPage
