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
  ticking: boolean // used to throttle updates to requestAnimationFrame speed
  lastKnownScrollX: number
  lastKnownScrollY: number

  state = {
    scrollX: 0,
    scrollY: 0,
  }

  componentDidMount() {
    window.addEventListener('scroll', this._handleScroll)
  }
  componentWillUnmount() {
    window.removeEventListener('scroll', this._handleScroll)
  }

  _handleScroll = () => {
    this.lastKnownScrollX = window.scrollX
    this.lastKnownScrollY = window.scrollY

    if (!this.ticking) {
      window.requestAnimationFrame(() => {
        this.setState({
          scrollX: this.lastKnownScrollX,
          scrollY: this.lastKnownScrollY,
        })
        this.ticking = false
      })

      this.ticking = true
    }
  }

  render() {
    const { children } = this.props
    const { scrollX, scrollY } = this.state
    return children({ scrollX, scrollY })
  }
}

export default Scroll
