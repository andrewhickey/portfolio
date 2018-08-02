import * as React from 'react'
import styled from 'styled-components'
import SectionTitle from '../layout/SectionTitle'
import Row from '../layout/Row'
import Column from '../layout/Column'
import Lightbox from 'react-images'
import { rhythm } from '../../utils/typography'

interface PreviewImgProps {
  src: string
}
const PreviewImg = styled.div`
  cursor: pointer;
  background-image: url(${(props: PreviewImgProps) => props.src});
  background-size: cover;
  margin-right: ${rhythm(2)};
  width: 100%;
`

const ProjectCardColumn = Column.extend`
  margin-bottom: ${rhythm(1)};
`

interface ProjectCardProps {
  children: React.ReactNode
  src: string
  title: string
}
class AlfaPos extends React.Component<ProjectCardProps> {
  state = {
    lightboxIsOpen: false,
  }

  _openLightbox = () => {
    this.setState({ lightboxIsOpen: true })
  }

  _closeLightbox = () => {
    this.setState({ lightboxIsOpen: false })
  }

  render() {
    const { title, children, src } = this.props

    return (
      <ProjectCardColumn>
        <SectionTitle>{title}</SectionTitle>
        <Row>
          <Lightbox
            images={[{ src }]}
            isOpen={this.state.lightboxIsOpen}
            backdropClosesModal={true}
            showImageCount={false}
            onClose={this._closeLightbox}
          />
          <PreviewImg src={src} onClick={this._openLightbox} />
          <Column>{children}</Column>
        </Row>
      </ProjectCardColumn>
    )
  }
}

export default AlfaPos
