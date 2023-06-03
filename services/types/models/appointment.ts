/* eslint-disable @typescript-eslint/no-unused-vars */
interface IAppointment {
  id?: string
  type: string
  location: string
  consign: string
  activate: string
  days: string
  startTime: string
  endTime: string
  price: number | null
}

interface IAppointmentDTO {
  id?: string
  type: string
  location: string[]
  consign: string
  activate: boolean
  days: string[]
  startTime: Date
  endTime: Date
  price: number
}
