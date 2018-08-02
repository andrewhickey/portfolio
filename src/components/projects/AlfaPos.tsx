import * as React from 'react'
import Row from '../layout/Row'
import Column from '../layout/Column'

const AlfaPos = () => (
  <div>
    <h2>Alfa Point of Sale</h2>
    <Row>
      <div
        style={{ width: '200px', height: '200px', backgroundColor: 'blue' }}
      />
      <Column>
        <p>
          A single page application used in car dealerships to create finance
          deals.
        </p>
        <p>
          Tech: Webpack, React, Redux, Jest, Enzyme, Styled Components,
          Storybook, Material-UI
        </p>
      </Column>
    </Row>
  </div>
)

export default AlfaPos
