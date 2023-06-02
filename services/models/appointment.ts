// import assert from "assert"

import { CalendarDaysType } from "@components/CalendarDays/index.types"
import { IAppointment } from "@services/types/models/appointment"

export default class Appointment implements IAppointment {
  id = ""

  type = ""

  location = []

  consign = ""

  activate = false

  days = ""

  startTime = ""

  endTime = ""

  price!: number | null

  constructor(appointment?: IAppointment) {
    if (appointment) {
      Object.assign(this, appointment)
    }
  }
}
