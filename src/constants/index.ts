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
    },
    {
      name: 'GLG',
      position: 'Principal software engineer',
      website: 'https://glg.it/',
      startDate: '2019-08',
      endDate: '2019-012',
      summary: '',
      highlights: [],
    },
    {
      name: 'Woodford Investment',
      position: 'Lead software engineer',
      website: 'https://app.otro.com/',
      startDate: '2019-03',
      endDate: '2019-08',
      summary: '',
      highlights: [],
    },
    {
      name: 'Otro',
      position: 'Senior software engineer',
      website: 'https://app.otro.com/',
      startDate: '2018-07',
      endDate: '2019-03',
      summary: '',
      highlights: [],
    },
    {
      name: 'Alfa Systems',
      position: 'Senior software engineer',
      website: 'https://www.alfasystems.com/',
      startDate: '2017-06',
      endDate: '2018-06',
      summary: '',
      highlights: [],
    },
    {
      name: 'HT2 Labs - Learning Locker',
      position: 'Lead software engineer',
      website: 'http://docs.learninglocker.net/welcome/',
      startDate: '2015-04',
      endDate: '2017-06',
      summary: '',
      highlights: [],
    },
    {
      name: 'HT2 Labs',
      position: 'Software engineer',
      website: 'http://docs.learninglocker.net/welcome/',
      startDate: '2014-01',
      endDate: '2015-04',
      summary: '',
      highlights: [],
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
      name: 'Web Development',
      level: 'Master',
      keywords: ['HTML', 'CSS', 'Javascript'],
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
      name: 'Wildlife',
      keywords: ['Ferrets', 'Unicorns'],
    },
  ],
  references: [
    {
      name: 'Jane Doe',
      reference: 'Reference...',
    },
  ],
}

export { resume }
