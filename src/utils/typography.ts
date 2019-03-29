import * as Typography from 'typography'
import sutroTheme from 'typography-theme-sutro'
import { color1 } from './colors'

sutroTheme.googleFonts = [
  {
    name: 'Inconsolata',
    styles: ['400', '400i', '700', '700i'],
  },
]
sutroTheme.headerFontFamily = ['Inconsolata', 'sans-serif']
sutroTheme.bodyFontFamily = ['Inconsolata', 'sans-serif']
sutroTheme.bodyWeight = 400

sutroTheme.overrideThemeStyles = () => ({
  a: {
    color: color1,
  },
})

const typography = new Typography(sutroTheme)

const { rhythm, scale } = typography

export { rhythm, scale }
export default typography
