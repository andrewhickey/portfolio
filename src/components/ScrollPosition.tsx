import * as React from 'react'
import { PureComponent } from 'react'

interface RenderFunc {
  (
    args: {
      scrollX: number
      scrollY: number
    }
  ): React.ReactNode
}
interface ScrollProps {
  children: RenderFunc
}
class Scroll extends PureComponent<ScrollProps> {
  eventReference: string

  state = {
    scrollX: 0,
    scrollY: 0,
  }

  componentDidMount() {
    window.addEventListener('scroll', this._handleScroll)
  }

  _handleScroll = () => {
    this.setState({ scrollX: window.scrollX, scrollY: window.scrollY })
  }

  render() {
    const { children } = this.props
    const { scrollX, scrollY } = this.state
    return children({ scrollX, scrollY })
  }
}

export default Scroll
