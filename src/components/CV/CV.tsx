import SectionTitle from '../layout/SectionTitle'
import * as React from 'react'
import styled from 'styled-components'
import Technologies from './Technologies'
import Languages from './Languages'
import OtroLogo from './logos/OtroLogo'
import AlfaLogo from './logos/AlfaLogo'
import LearningLockerLogo from './logos/LearningLockerLogo'
import HT2LabsLogo from './logos/HT2LabsLogo'
import ContentGuruLogo from './logos/ContentGuruLogo'
import MancUniLogo from './logos/MancUniLogo'
import LauncestonLogo from './logos/LauncestonLogo'
import { rhythm } from '../../utils/typography'

const Section = styled.div`
  display: grid;
  grid-template-areas:
    'logo subtitle'
    'logo dates'
    'summary summary'
    'achievements achievements';
  grid-template-columns: ${rhythm(4)} auto;
  grid-template-rows: auto;
  grid-column-gap: ${rhythm(0.5)};
  margin-bottom: ${rhythm(0.5)};

  @media (min-width: 574px) {
    grid-template-columns: minmax(20%, 150px) auto;
    grid-template-areas:
      'logo subtitle'
      'dates summary'
      'empty achievements';
    grid-column-gap: ${rhythm(1)};
  }
`

const NoWrap = styled.span`
  white-space: nowrap;
`

const Logo = styled.div`
  grid-area: logo;
  justify-self: center;
  align-self: start;
`

const Dates = styled.p`
  grid-area: dates;
  align-self: start;
`

const SubTitle = styled.p`
  grid-area: subtitle;
  font-weight: bold;
  font-size: 1.1rem;
  margin-bottom: 0;
`

const Summary = styled.p`
  grid-area: summary;
`

const Achievements = styled.ul`
  grid-area: achievements;
`

const Skills = styled.div`
  display: grid;

  grid-column-gap: ${rhythm(0.5)};
  grid-template-columns: 1fr;
  grid-template-rows: auto auto;

  @media (min-width: 574px) {
    grid-template-columns: 1fr 1fr;
    grid-template-rows: 1fr;
  }
`

const CV = () => (
  <>
    <SectionTitle>Skills</SectionTitle>
    <Skills>
      <Technologies />
      <Languages />
    </Skills>

    <SectionTitle>Experience</SectionTitle>
    <Section>
      <Logo>
        <OtroLogo width="100%" />
      </Logo>
      <Dates>
        <b>Otro</b> <NoWrap>2018‑2019</NoWrap>
      </Dates>
      <SubTitle>Senior Software Engineer</SubTitle>
      <Summary>
        Joined the project a couple of months before public release and helped
        to push it to completion while improving test coverage and eliminating
        bugs.
      </Summary>
      <Achievements>
        <li>
          Took responsibilty for some of the more complex areas of the
          application involving animation and visualisation.
        </li>
        <li>
          Isolated troublesome components using storybook and unit tests to
          reduce overall complexity.
        </li>
        <li>
          Integrated quickly with existing team members and other stakeholders
          from the business.
        </li>
        <li>
          Shared knowledge with other team members through code reviews, pair
          programming and informal chats.
        </li>
      </Achievements>
    </Section>

    <Section>
      <Logo>
        <AlfaLogo width="100%" />
      </Logo>
      <Dates>
        <b>Alfa Systems</b> <NoWrap>2017‑2018</NoWrap>
      </Dates>
      <SubTitle>Senior Software Engineer</SubTitle>
      <Summary>
        Primarily responsible for front end development on the Alfa Systems
        Point of sale product.
      </Summary>
      <Achievements>
        <li>
          Set up build process and configured other tooling to be used
          throughout the company.
        </li>
        <li>
          Modularised existing proof of concept into a reusable component
          library.
        </li>
        <li>
          Worked closely with clients to gather requirements and estimate
          effort.
        </li>
        <li>
          Shared knowledge with other team members through code reviews, pair
          programming and breakout sessions.
        </li>
        <li>
          Worked with the rest of the team to deliver agreed on features in less
          than the budgeted time.
        </li>
      </Achievements>
    </Section>

    <Section>
      <Logo>
        <LearningLockerLogo />
      </Logo>
      <Dates>
        <b>HT2 Labs</b> <NoWrap>2015‑2017</NoWrap>
      </Dates>
      <SubTitle>Product Lead</SubTitle>
      <Summary>
        Led design and development on Learning Locker, the world’s most
        installed Learning Record Store. Worked remotely with a team in Canada
        and the UK.
      </Summary>
      <Achievements>
        <li>
          Took Learning Locker through R&D to full product status including
          features such as authorization/authentication, reporting and insertion
          APIs and customisable dashboards (using D3).
        </li>
        <li>
          Gathered community feedback and prioritised feature development to
          make Learning Locker the most popular solution in its field.
        </li>
        <li>
          Won the MongoDB award for open source innovation 2016 (won by Facebook
          the year before).
        </li>
        <li>
          Led a small development team to support several large scale
          implementations (JISC, Macy's, Xerox, Nike and others).
        </li>
        <li>Responsible for the adoption of React.js at HT2.</li>
      </Achievements>
    </Section>

    <Section>
      <Logo>
        <HT2LabsLogo />
      </Logo>
      <Dates>
        <b>HT2 Labs</b> <NoWrap>2014‑2015</NoWrap>
      </Dates>
      <SubTitle>Software Engineer</SubTitle>
      <Summary>
        Built e-learning solutions as a full stack developer for HT2's clients
        including BP, Duke University, City and Guilds and Great Ormond Street
        Children's hospital using tools such as AngularJS and Marionette.js.
      </Summary>
      <Achievements>
        <li>
          Kept in close contact with clients to ensure that the delivered
          products met a changing set of requirements.
        </li>
        <li>
          Won gold and bronze at the Learning & Performance Institute - Learning
          Awards.{' '}
          <a href="https://youtu.be/SrPiUPeqGdg">
            The project manager can be seen speaking about it here.
          </a>
        </li>
        <li>
          Added enhancements such as video capture, to the company’s existing
          social learning platform, Curatr.
        </li>
      </Achievements>
    </Section>

    <Section>
      <Logo>
        <ContentGuruLogo />
      </Logo>
      <Dates>
        <b>Content Guru</b> <NoWrap>2011‑2014</NoWrap>
      </Dates>
      <SubTitle>Systems Engineer</SubTitle>
      <Summary>
        Responsible for general platform stability as well as troubleshooting
        for a handful of aligned clients.
      </Summary>
      <Achievements>
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
      </Achievements>
    </Section>

    <SectionTitle>Education</SectionTitle>
    <Section>
      <Logo>
        <LauncestonLogo />
      </Logo>
      <Dates>
        <b>Manchester University</b> <NoWrap>2007‑2010</NoWrap>
      </Dates>
      <SubTitle>BSc Computer Science</SubTitle>
    </Section>

    <Section>
      <Logo>
        <MancUniLogo />
      </Logo>
      <Dates>
        <b>Launceston College</b> <NoWrap>2004‑2006</NoWrap>
      </Dates>
      <SubTitle>Computing, Maths, Physics, French A-Level</SubTitle>
    </Section>
  </>
)

export default CV
