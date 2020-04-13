import * as React from 'react'
import SectionTitle from '../layout/SectionTitle'
import Lightbox from 'react-images'
import { rhythm } from '../utils/typography'

const ProjectCardContainer = styled.div`
  margin-bottom: ${rhythm(1)};
  display: grid;
  grid-template-columns: auto;
  grid-template-areas:
    'title'
    'preview'
    'summary';

  @media (min-width: 850px) {
    grid-template-columns: minmax(150px, 40%) auto;
    grid-template-areas:
      'title title'
      'preview summary'
      'any summary';
    grid-column-gap: ${rhythm(1)};
  }
`

const Title = styled(SectionTitle)`
  grid-area: title;
`

const Preview = styled.img`
  grid-area: preview;
`

const Description = styled.div`
  grid-area: summary;
`

interface ProjectCardProps {
  children: React.ReactNode
  src: string
  title: React.ReactNode
}
class ProjectCard extends React.Component<ProjectCardProps> {
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
      <ProjectCardContainer>
        <Title>{title}</Title>
        <Preview src={src} onClick={this._openLightbox} />
        <Description>{children}</Description>
        <Lightbox
          images={[{ src }]}
          isOpen={this.state.lightboxIsOpen}
          backdropClosesModal={true}
          showImageCount={false}
          onClose={this._closeLightbox}
        />
      </ProjectCardContainer>
    )
  }
}

export default ProjectCard
