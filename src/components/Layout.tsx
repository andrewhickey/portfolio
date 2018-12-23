import * as React from 'react'
import Helmet from 'react-helmet'
import styled from 'styled-components'
import { StaticQuery, graphql } from 'gatsby'
import { text } from '../utils/colors'
import { AquariumController, AquariumContext } from '../context/AquariumContext'
import MeasureWindow from './MeasureWindow'
import Background from './Background'

const SiteContainer = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  color: ${text};
  & a {
    color: inherit;
  }
`

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
              content: 'Homepage for Andrew Hickey, contract web developer.',
            },
            {
              name: 'keywords',
              content:
                'andrew, hickey, contract, web, developer, react, javascript',
            },
          ]}
        />
        <SiteContainer>{children}</SiteContainer>
      </>
    )}
  />
)

export default Layout
