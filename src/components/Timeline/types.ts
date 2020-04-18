import { ResumeSchema } from '../../types/ResumeSchema'

type ProjectItem = ResumeSchema['projects'][0]

export type TimelineItem = Omit<ProjectItem, 'keywords, startDate, endDate'> & {
  keywords: string[]
  startDate: Date
  endDate: Date
}
