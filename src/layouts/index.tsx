import * as React from 'react'
import Helmet from 'react-helmet'
import styled from 'styled-components'
import Header from '../components/header'
import { rhythm } from '../utils/typography'

const Container = styled.div`
  padding: ${rhythm(2)};
`
interface LayoutProps {
  children: () => React.ReactNode
  data: {
    site: {
      siteMetadata: {
        title: string
      }
    }
  }
}
const Layout = ({ children, data }: LayoutProps) => (
  <div>
    <Helmet
      title={data.site.siteMetadata.title}
      meta={[
        { name: 'description', content: 'Sample' },
        { name: 'keywords', content: 'sample, something' },
      ]}
    />
    <Header siteTitle={data.site.siteMetadata.title} />
    <Container>{children()}</Container>
  </div>
)

export default Layout

export const query = graphql`
  query SiteTitleQuery {
    site {
      siteMetadata {
        title
      }
    }
  }
`
