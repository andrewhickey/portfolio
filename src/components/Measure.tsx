import * as React from 'react'
import { PureComponent } from 'react'
import ResizeObserver from 'resize-observer-polyfill'

interface RenderFunc<RefType> {
  (
    args: {
      rect?: DOMRectReadOnly
      ref: React.RefObject<RefType>
    }
  ): React.ReactNode
}
interface MeasureProps<RefType> {
  children: RenderFunc<RefType>
}
interface MeasureState {
  rect?: DOMRectReadOnly
}

// should be generic but gatsby-plugin-typescript doesn't support JSX generics yet
class Measure extends PureComponent<MeasureProps<any>> {
  measureRef = React.createRef<any>()

  state: MeasureState = {
    rect: null,
  }

  resizeObserver = new ResizeObserver(changedNodes => {
    changedNodes.forEach(node => {
      const rect = node.target.getBoundingClientRect()
      this.setState({ rect })
    })
  })

  _observe = () => {
    const node = this.measureRef.current
    if (node) this.resizeObserver.observe(node)
  }

  _onScroll = () => {
    const rect = this.measureRef.current.getBoundingClientRect()
    this.setState({ rect })
  }

  componentDidMount() {
    this._observe()
    window.addEventListener('scroll', this._onScroll)
  }

  componentDidUpdate() {
    this._observe()
  }

  componentWillUnmount() {
    this.resizeObserver.disconnect()
    window.removeEventListener('scroll', this._onScroll)
  }

  render() {
    const { children } = this.props
    const { rect } = this.state
    return children({ ref: this.measureRef, rect })
  }
}

export default Measure
