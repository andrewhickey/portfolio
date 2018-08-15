import * as React from 'react'

interface MeasureWindowProps {
  children: (
    measurements: { windowWidth: number; windowHeight: number }
  ) => React.ReactNode
}
class MeasureWindow extends React.Component<MeasureWindowProps> {
  state = {
    windowWidth: window.innerWidth,
    windowHeight: window.innerHeight,
  }

  _storeWindowSize = () => {
    const windowWidth = window.innerWidth
    const windowHeight = window.innerHeight

    this.setState({
      windowWidth,
      windowHeight,
    })
  }

  componentDidMount() {
    window.addEventListener('resize', this._storeWindowSize)
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this._storeWindowSize)
  }

  render() {
    const { windowWidth, windowHeight } = this.state

    return this.props.children({
      windowWidth,
      windowHeight,
    })
  }
}

export default MeasureWindow
