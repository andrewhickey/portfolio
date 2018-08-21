import SectionTitle from '../layout/SectionTitle'
import * as React from 'react'
import styled from 'styled-components'
import Technologies from './Technologies'
import Languages from './Languages'
import Bio from './Bio'
import Obstacle from '../Obstacle'
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

const SubTitle = styled.h4`
  margin-top: 0;
`

const CV = () => (
  <>
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
        <Obstacle obstacleId="testparagraph">
          {({ ref }) => (
            <p ref={ref}>
              Primarily responsible for front end development on the Alfa
              Systems Point of sale product.
            </p>
          )}
        </Obstacle>
        <ul>
          <li>
            Set up build process and configured other tooling to be used
            throughout the company.
          </li>
          <li>
            Modularised existing proof of concept into a re-usable component
            library.
          </li>
          <li>
            Worked closely with clients to gather requirements and estimate
            effort.
          </li>
          <li>
            Shared knowlege with other team members through code reviews, pair
            programming and breakout sessions.
          </li>
          <li>
            Worked with the rest of the team to deliver agreed on features in
            less than the budgeted time.
          </li>
        </ul>
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
          Built the Learning Locker proof of concept and then led development
          and product direction.
        </p>
        <ul>
          <li>Took Learning Locker through R&D to full product status.</li>
          <li>
            Gathered community feedback and prioritised feature development to
            make Learning Locker the most popular solution in its field.
          </li>
          <li>
            Won the MongoDB award for open source innovation 2016 (won by
            Facebook the year before).
          </li>
          <li>
            Led a small development team to support several large scale
            implementations (JISC, Macy's, Xerox, Nike and others).
          </li>
        </ul>
      </Column>
    </Row>
    <Row>
      <TimeAt logo={<HT2LabsLogo />} companyName="HT2 Labs" time="2014-2015" />
      <Column>
        <SubTitle>Software Developer</SubTitle>
        <p>
          Built e-learning solutions as a full stack developer for HT2's clients
          including BP, Duke University, City and Guilds and Great Ormond Street
          Children's hospital using tools such as AngularJS and Marionette.js.
        </p>
        <ul>
          <li>
            Kept in close contact with clients to ensure that the delivered
            products met a changing set of requirements.
          </li>
          <li>
            Won gold and bronze at the Learning & Performance Institute -
            Learning Awards.{' '}
            <a href="https://youtu.be/SrPiUPeqGdg">
              The project manager can be seen speaking about it here.
            </a>
          </li>
          <li>
            Added enhancements such as video capture, to the company’s existing
            social learning platform, Curatr.
          </li>
        </ul>
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
          Responsible for general platform stability as well as troubleshooting
          for a handful of aligned clients.
        </p>
        <ul>
          <li>
            Installed and maintained dedicated hardware in Content Guru's data
            center enclosures.
          </li>
          <li>
            Learned the details of telephony systems to troubleshoot bugs in
            bespoke systems.
          </li>
          <li>
            Managed replicated MSSQL instances to ensure stability and uptime.
          </li>
          <li>Received consistently good feedback from clients.</li>
        </ul>
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
  </>
)

export default CV
