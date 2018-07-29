import SectionTitle from './SectionTitle'
import * as React from 'react'
import styled from 'styled-components'
import Technologies from './Technologies'
import Languages from './Languages'
import Bio from './Bio'
import Row from '../layout/Row'
import Column from '../layout/Column'
import AlfaLogo from './logos/AlfaLogo'
import LearningLockerLogo from './logos/LearningLockerLogo'
import HT2LabsLogo from './logos/HT2LabsLogo'
import ContentGuruLogo from './logos/ContentGuruLogo'
import MancUniLogo from './logos/MancUniLogo'
import LauncestonLogo from './logos/LauncestonLogo'
import { rhythm } from '../../utils/typography'

const LogoContainer = styled.div`
  width: ${rhythm(2.5)};
  margin-right: ${rhythm(0.5)};
  padding-top: ${rhythm(0.25)};
  display: flex;
  align-items: flex-start;
  justify-content: center;
`
const TimeRow = Row.extend`
  width: 20rem;
`
interface TimeAtProps {
  logo: React.ReactNode
  companyName: string
  time: string
}
const TimeAt = ({ logo, companyName, time }: TimeAtProps) => (
  <TimeRow>
    <LogoContainer>{logo}</LogoContainer>
    <div>
      <div>
        <b>{companyName}</b>
      </div>
      <div>{time}</div>
    </div>
  </TimeRow>
)

const SkillsRow = Row.extend`
  & > * {
    flex: 1;
  }
  & > *:not(:last-child) {
    margin-right: ${rhythm(1)};
  }
`

const CVContainer = styled.div`
  max-width: 992px;
`

const SubTitle = styled.h4`
  margin-top: 0;
`

const CV = () => (
  <CVContainer>
    <SectionTitle>Bio</SectionTitle>
    <Bio />
    <SectionTitle>Skills</SectionTitle>
    <SkillsRow>
      <Technologies />
      <Languages />
    </SkillsRow>
    <SectionTitle>Experience</SectionTitle>
    <Row>
      <TimeAt
        logo={<AlfaLogo width="100%" />}
        companyName="Alfa Systems"
        time="2017-2018"
      />
      <Column>
        <SubTitle>Senior Developer</SubTitle>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. At ratione,
          unde odit laudantium accusantium enim aut doloremque sit voluptas
          voluptatibus pariatur amet illo perspiciatis laboriosam facilis culpa
          atque officia doloribus?
        </p>
      </Column>
    </Row>
    <Row>
      <TimeAt
        logo={<LearningLockerLogo />}
        companyName="HT2 Labs"
        time="2015-2017"
      />
      <Column>
        <SubTitle>Product Lead - Learning Locker</SubTitle>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. At ratione,
          unde odit laudantium accusantium enim aut doloremque sit voluptas
          voluptatibus pariatur amet illo perspiciatis laboriosam facilis culpa
          atque officia doloribus?
        </p>
      </Column>
    </Row>
    <Row>
      <TimeAt logo={<HT2LabsLogo />} companyName="HT2 Labs" time="2014-2015" />
      <Column>
        <SubTitle>Software Developer</SubTitle>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. At ratione,
          unde odit laudantium accusantium enim aut doloremque sit voluptas
          voluptatibus pariatur amet illo perspiciatis laboriosam facilis culpa
          atque officia doloribus?
        </p>
      </Column>
    </Row>
    <Row>
      <TimeAt
        logo={<ContentGuruLogo />}
        companyName="Content Guru"
        time="2011-2014"
      />
      <Column>
        <SubTitle>Systems Engineer</SubTitle>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. At ratione,
          unde odit laudantium accusantium enim aut doloremque sit voluptas
          voluptatibus pariatur amet illo perspiciatis laboriosam facilis culpa
          atque officia doloribus?
        </p>
      </Column>
    </Row>
    <SectionTitle>Education</SectionTitle>
    <Row>
      <TimeAt
        logo={<MancUniLogo />}
        companyName="Manchester University"
        time="2007-2010"
      />
      <SubTitle>BSc Computer Science</SubTitle>
    </Row>
    <Row>
      <TimeAt
        logo={<LauncestonLogo />}
        companyName="Launceston College"
        time="2004-2006"
      />
      <SubTitle>Computing, Maths, Physics, French A-Level</SubTitle>
    </Row>
  </CVContainer>
)

export default CV
