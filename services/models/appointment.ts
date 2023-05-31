// import assert from "assert"

import { CalendarDaysType } from "@components/CalendarDays/index.types"
import { IAppointment } from "@services/types/models/appointment"

export default class Appointment implements IAppointment {
  id = ""
  type = ""
  location = [] 
  consign = ""
  activate = false
  days = {} as CalendarDaysType
  startTime = ""
  endTime = ""
  price = 0

  constructor(appointment: IAppointment) {
    Object.assign(this, appointment)
  }
}
