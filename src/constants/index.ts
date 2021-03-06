import { ResumeSchema } from '../types/ResumeSchema'

const resume: ResumeSchema = {
  basics: {
    name: 'Andrew Hickey',
    label: 'Software Engineer',
    picture: '',
    email: 'andrewhickey@live.co.uk',
    phone: '',
    website: 'https://ahickey.dev',
    summary: 'An experienced developer. I mainly write Javascript.',
    location: {
      address: '',
      postalCode: 'RG14 1RG',
      city: 'Newbury',
      countryCode: 'UK',
      region: 'Berkshire',
    },
    profiles: [
      {
        network: 'LinkedIn',
        url: 'https://www.linkedin.com/in/andrew-hickey-0290a4a8/',
      },
      {
        network: 'Github',
        url: 'https://github.com/andrewhickey',
        username: 'andrewhickey',
      },
    ],
  },
  work: [
    {
      name: 'Golddust Ltd',
      position: 'Lead sofware engineer',
      website: 'https://golddust.io',
      startDate: '2020-01-01',
      endDate: '2020-04-01',
      summary: 'Lead development on React Native app and back end stack.',
      highlights: [
        'Took the app from wireframes to initial user testing.',
        'Set up distribution for both iOS and Android',
      ],
      keywords: ['React-Native', 'Firebase', 'Gatsby'],
    },
    {
      name: 'GLG',
      position: 'Principal software engineer',
      website: 'https://glg.it/',
      startDate: '2019-08',
      endDate: '2019-012',
      summary: 'Lead development on an in house messaging tool',
      highlights: [
        'Integrated messaging into other tools',
        'Added file upload backed by sharepoint',
      ],
      keywords: ['React', 'Node.js', 'SQL'],
    },
    {
      name: 'Woodford Investment',
      position: 'Lead software engineer',
      website: 'https://woodfordfunds.com/',
      startDate: '2019-03',
      endDate: '2019-08',
      summary: 'Lead development on a new data visualisation tool',
      highlights: [
        "Built a tool allowing high level and deep understanding of the company's holdings",
        'Created an intuitive UX for even non-technical users',
        'Maintained fluid 60fps animations even on mobile devices',
      ],
      keywords: ['React', 'D3', 'Node.js', 'SQL'],
    },
    {
      name: 'Otro',
      position: 'Senior software engineer',
      website: 'https://app.otro.com/',
      startDate: '2018-07',
      endDate: '2019-03',
      summary: '',
      highlights: [
        'Lead development on animation and data heavy elements of the app',
        'Got all animations to 60fps on web and in React-Native',
      ],
      keywords: ['React', 'React-Native'],
    },
    {
      name: 'Alfa Systems',
      position: 'Senior software engineer',
      website: 'https://www.alfasystems.com/',
      startDate: '2017-06',
      endDate: '2018-06',
      summary:
        'Lead front end development on a new point of sale leasing application',
      highlights: [
        'Separated view and business logic to improve development speed',
        'Worked with UI design team to streamline customer UX',
        'Built a proof of concept port in React-Native',
      ],
      keywords: ['React', 'React-Native'],
    },
    {
      name: 'HT2 Labs - Learning Locker',
      position: 'Lead software engineer',
      website: 'http://docs.learninglocker.net/welcome/',
      startDate: '2015-04',
      endDate: '2017-06',
      summary:
        'Managed development team, open source community and product features for Learning Locker, a data warehousing and analysis tool',
      highlights: [
        'Prototyped first version of the product to secure funding',
        'Led a team to make Learning Locker the most popular solution in its field.',
        "Delivered large scale implementations to clients including Walmart, Nike, Macy's, Xerox, UK Universities and others.",
        'Won the MongoDB award for open source innovation 2016 (won by Facebook the year before).',
        "The product went on to win the Queen's award for innovation",
      ],
      keywords: ['React', 'Node.js', 'MongoDB', 'Laravel'],
    },
    {
      name: 'HT2 Labs',
      position: 'Software engineer',
      website: 'http://docs.learninglocker.net/welcome/',
      startDate: '2014-01',
      endDate: '2015-04',
      summary:
        "Built bespoke applications for HT2 clients including BP, Duke University, City and Guilds and Great Ormond Street Children's hospital",
      highlights: [
        'Won gold and bronze at the Learning & Performance Institute - Learning Awards.',
        "Added enhancements such as video capture to the company's L&D platform, Curatr",
      ],
      keywords: ['Javascript', 'Node.js', 'Laravel'],
    },
  ],
  volunteer: [
    {
      organization: 'Project Trust',
      position: 'Volunteer Teacher',
      website: 'https://projecttrust.org.uk/',
      startDate: '2006-07-01',
      endDate: '2007-07-01',
      summary:
        'Spent a year as a volunteer English teacher in Mauritania, West Africa',
      highlights: [
        'Put on extra-curricular computer literacy classes',
        'Worked as a tutor for children needing extra help',
      ],
    },
  ],
  education: [
    {
      institution: 'University of Manchester',
      area: 'Computer Science',
      studyType: 'Bachelor',
      startDate: '2007-09-01',
      endDate: '2010-07-01',
    },
  ],
  awards: [
    {
      title: 'MongoDB award',
      date: '2016-06-01',
      awarder: 'MongoDB Inc',
      summary: 'Given for innovation with MongoDB in open source.',
    },
    {
      title: 'Learning Awards',
      date: '2015-05-01',
      awarder: 'Learning & Performance Institute',
      summary: 'Won gold and silver for advances in social learning',
    },
  ],
  skills: [
    {
      name: 'Software Engineering',
      level: 'Master',
      skill: 95,
      keywords: ['Javascript', 'Git', 'Python', 'TDD'],
    },
    {
      name: 'Web Front-End',
      level: 'Master',
      skill: 90,
      keywords: ['HTML', 'CSS'],
    },
    {
      name: 'Web Back-End',
      level: 'Master',
      skill: 85,
      keywords: ['Node.js', 'SQL', 'MongoDB'],
    },
    {
      name: 'Native',
      level: 'Master',
      skill: 90,
      keywords: ['React-Native', 'Android', 'iOS'],
    },
    {
      name: 'DevOps',
      level: 'Intermediate',
      skill: 65,
      keywords: ['CI', 'GCP', 'AWS', 'Azure'],
    },
  ],
  languages: [
    {
      language: 'English',
      fluency: 'Native speaker',
    },
    {
      language: 'French',
      fluency: 'Rusty',
    },
  ],
  interests: [
    {
      name: 'Games development',
      keywords: ['Unity3D'],
    },
  ],
}

export { resume }
