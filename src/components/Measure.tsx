import * as React from 'react'
import { PureComponent } from 'react'
import ResizeObserver from 'resize-observer-polyfill'

interface RenderFunc {
  (
    args: {
      width: number
      height: number
      ref: React.RefObject<SVGTextElement>
    }
  ): React.ReactNode
}
interface MeasureProps {
  children: RenderFunc
}
class Measure extends PureComponent<MeasureProps> {
  measureRef = React.createRef<SVGTextElement>()

  state = {
    width: 0,
    height: 0,
  }

  resizeObserver = new ResizeObserver(changedNodes => {
    changedNodes.forEach(node => {
      const { width, height } = node.contentRect
      this.setState({ width, height })
    })
  })

  componentDidMount() {
    this._observe()
  }

  componentDidUpdate() {
    this._observe()
  }

  _observe = () => {
    const node = this.measureRef.current
    if (node) this.resizeObserver.observe(node)
  }

  componentWillUnmount() {
    this.resizeObserver.disconnect()
  }

  render() {
    const { children } = this.props
    const { width, height } = this.state
    return children({ ref: this.measureRef, width, height })
  }
}

export default Measure
