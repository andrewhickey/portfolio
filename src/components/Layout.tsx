import * as React from 'react'
import Helmet from 'react-helmet'
import styled from 'styled-components'
import { StaticQuery, graphql } from 'gatsby'
import { rhythm } from '../utils/typography'
import Header from './header'
import Background from './Background'

const Container = styled.div`
  padding: ${rhythm(2)};
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
            { name: 'description', content: 'Sample' },
            { name: 'keywords', content: 'sample, something' },
          ]}
        />
        <Background />
        <Header siteTitle={data.site.siteMetadata.title} />
        <Container>{children}</Container>
      </>
    )}
  />
)

export default Layout
