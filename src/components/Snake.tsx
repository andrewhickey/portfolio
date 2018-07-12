import * as React from 'react'
import { Component } from 'react'
import { Group, Circle } from 'react-konva'
import { range } from 'lodash'
import { StaggeredMotion, spring, presets, PlainStyle } from 'react-motion'

interface SnakeStyle {
  x: number
  y: number
}

interface SnakeProps extends PlainStyle {
  x: number
  y: number
}
class Snake extends Component<SnakeProps> {
  getStyles = (prevStyles: PlainStyle[]) => {
    const { x, y } = this.props
    const endValue = prevStyles.map((_, i) => {
      return i === 0
        ? { x, y }
        : {
            x: spring(prevStyles[i - 1].x, presets.gentle),
            y: spring(prevStyles[i - 1].y, presets.gentle),
          }
    })
    return endValue
  }

  render() {
    const { x, y } = this.props
    const defaultStyles = range(5).map(() => ({ x, y }))

    return (
      <StaggeredMotion defaultStyles={defaultStyles} styles={this.getStyles}>
        {(styles: SnakeStyle[]) => (
          <Group>
            {styles.map((style, index) => (
              <Circle
                x={style.x}
                y={style.y}
                key={index}
                fill="green"
                radius={20}
              />
            ))}
          </Group>
        )}
      </StaggeredMotion>
    )
  }
}

export default Snake

{
  /* <Path
        x={x}
        y={y}
        data="M12.582,9.551C3.251,16.237,0.921,29.021,7.08,38.564l-2.36,1.689l4.893,2.262l4.893,2.262l-0.568-5.36l-0.567-5.359l-2.365,1.694c-4.657-7.375-2.83-17.185,4.352-22.33c7.451-5.338,17.817-3.625,23.156,3.824c5.337,7.449,3.625,17.813-3.821,23.152l2.857,3.988c9.617-6.893,11.827-20.277,4.935-29.896C35.591,4.87,22.204,2.658,12.582,9.551z"
        fill="green"
      /> */
}
