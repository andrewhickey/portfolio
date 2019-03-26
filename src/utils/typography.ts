import * as Typography from 'typography'
import sutroTheme from 'typography-theme-sutro'

sutroTheme.googleFonts = [
  { name: 'Inconsolata', styles: ['300', '300i', '700', '700i'] },
]
sutroTheme.headerFontFamily = ['Inconsolata', 'sans-serif']
sutroTheme.bodyFontFamily = ['Inconsolata', 'sans-serif']

const typography = new Typography(sutroTheme)

const { rhythm, scale } = typography

export { rhythm, scale }
export default typography
