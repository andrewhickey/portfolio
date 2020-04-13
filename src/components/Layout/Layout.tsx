import { css } from '@emotion/core'
import { graphql, StaticQuery } from 'gatsby'
import * as React from 'react'
import Helmet from 'react-helmet'
import favicon from '../../../static/favicon.png'
import { color1, text } from '../../utils/colors'

interface LayoutProps {
  children: React.ReactNode
}
interface LayoutQueryResult {
  site: {
    siteMetadata: {
      title: string
    }
  }
}
const Layout = ({ children }: LayoutProps) => (
  <StaticQuery
    query={graphql`
      query LayoutQuery {
        site {
          siteMetadata {
            title
          }
        }
      }
    `}
    render={(data: LayoutQueryResult) => (
      <>
        <Helmet
          title={data.site.siteMetadata.title}
          meta={[
            {
              name: 'description',
              content:
                'Homepage for Andrew Hickey, contract software engineer.',
            },
            {
              name: 'keywords',
              content:
                'andrew, hickey, contract, web, developer, software, engineer, react, javascript',
            },
          ]}
        >
          <link rel="shortcut icon" href={favicon} />
        </Helmet>
        <div
          css={css`
            min-height: 100vh;
            width: 100%;
            display: flex;
            flex-direction: column;
            align-items: stretch;
            background-color: ${color1};
            color: ${text};
          `}
        >
          {children}
        </div>
      </>
    )}
  />
)

export default Layout
