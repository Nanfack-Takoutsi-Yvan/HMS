import { CalendarDaysType } from "@components/CalendarDays/index.types"

export interface IAppointment {
  id: string
  type: string
  location: string[]
  consign: string
  activate: boolean
  days: CalendarDaysType,
  startTime: string,
  endTime: string,
  price: number
}