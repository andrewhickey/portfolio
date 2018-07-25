module.exports = {
  pathPrefix: '/',
  siteMetadata: {
    title: 'Andrew Hickey',
  },
  plugins: [
    {
      resolve: 'gatsby-plugin-typescript',
      options: {
        transpileOnly: true,
        compilerOptions: {
          target: `esnext`,
          experimentalDecorators: true,
          jsx: `react`,
        },
      },
    },
    {
      resolve: `gatsby-plugin-typography`,
      options: {
        pathToConfigModule: `src/utils/typography`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: 'src/markdown',
        name: 'markdown-pages',
      },
    },
    `gatsby-transformer-remark`,
    'gatsby-plugin-styled-components',
    'gatsby-plugin-react-helmet',
    {
      resolve: `gatsby-plugin-nprogress`,
      options: {
        // Setting a color is optional.
        color: 'tomato',
        // Disable the loading spinner.
        showSpinner: false,
      },
    },
  ],
}
