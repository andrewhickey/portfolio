import Column from './Column'
import { rhythm } from '../../utils/typography'

const PageColumn = Column.extend`
  padding-top: ${rhythm(1.5)};
  width: 992px;
`

export default PageColumn
