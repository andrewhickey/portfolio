import * as React from 'react'
import styled from 'styled-components'

const BlackBackground = styled.div`
  background-color: black;
  padding: 8px;
  display: flex;
  align-items: center;
`

const OtroLogo = (props: React.HTMLProps<SVGSVGElement>) => (
  <BlackBackground>
    <svg
      viewBox="0 0 316 77"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="xMidYMid"
      {...props}
    >
      <g fillRule="evenodd">
        <path
          fill="#FFF"
          d="M85.771 0v13.841h23.208v59.57h16.785v-59.57h23.207V0z"
        />
        <g>
          <path
            fill="#FFF"
            d="M38.292.757C17.145.757 0 17.614 0 38.403 0 59.196 17.145 76.05 38.292 76.05c21.15 0 38.292-16.853 38.292-37.646C76.584 17.613 59.44.757 38.292.757m0 16.87c11.651 0 21.132 9.321 21.132 20.776S49.944 59.18 38.292 59.18c-11.652 0-21.133-9.32-21.133-20.776 0-11.455 9.481-20.776 21.133-20.776"
          />
        </g>
        <g transform="translate(239.257)">
          <path
            fill="#FFF"
            d="M38.33.757C17.185.757.04 17.614.04 38.403c0 20.793 17.145 37.646 38.292 37.646 21.149 0 38.292-16.853 38.292-37.646C76.623 17.613 59.48.757 38.33.757m0 16.87c11.654 0 21.132 9.321 21.132 20.776S49.985 59.18 38.33 59.18c-11.652 0-21.133-9.32-21.133-20.776 0-11.455 9.481-20.776 21.133-20.776"
          />
        </g>
        <path
          fill="#FFF"
          d="M179.028 13.844v30.764l5.027-5.174h8.43c4.958 0 8.729-1.118 11.312-3.357 2.583-2.237 3.874-5.383 3.874-9.44 0-4.124-1.291-7.287-3.874-9.49-2.583-2.202-6.354-3.303-11.313-3.303h-13.456zM209.861 3.25c4.656 2.17 8.24 5.245 10.755 9.232 2.513 3.983 3.771 8.703 3.771 14.155 0 5.456-1.272 10.159-3.822 14.109-2.548 3.95-6.166 6.972-10.857 9.07l16.006 23.596h-17.737l-13.549-20.134h-15.4v20.134h-16.514V0h30.888c6.318 0 11.804 1.084 16.459 3.25z"
        />
      </g>
    </svg>
  </BlackBackground>
)

export default OtroLogo
