import AppointmentController from "@services/controller/appointment.controller"
import assert from "assert"
import {
  Exclude,
  Expose,
  instanceToPlain,
  plainToInstance,
  Transform
} from "class-transformer"
import { Timestamp } from "firebase/firestore"

export default class Appointment implements IAppointment {
  @Expose({ name: "id" })
  id = ""

  @Expose({ name: "type" })
  type = ""

  @Expose({ name: "location" })
  @Transform(({ value }) => `${value}`.split(","), { toPlainOnly: true })
  @Transform(
    ({ value }: { value: string[] }) =>
      typeof value === "string" ? value : value?.join(),
    {
      toClassOnly: true
    }
  )
  location = ""

  @Expose({ name: "consign" })
  consign = ""

  @Expose({ name: "activate" })
  @Transform(({ value }) => value === "true", { toPlainOnly: true })
  @Transform(({ value }: { value: boolean }) => `${value}`, {
    toClassOnly: true
  })
  activate = ""

  @Expose({ name: "days" })
  @Transform(({ value }) => `${value}`.split(","), { toPlainOnly: true })
  @Transform(
    ({ value }: { value: string[] }) =>
      typeof value === "string" ? value : value?.join(),
    { toClassOnly: true }
  )
  days = ""

  @Expose({ name: "startTime" })
  @Transform(({ value }) => new Date(value || null), { toPlainOnly: true })
  @Transform(
    ({ value }: { value: Timestamp }) =>
      typeof value === "string" ? value : value?.toDate().toISOString(),
    { toClassOnly: true }
  )
  startTime = ""

  @Expose({ name: "endTime" })
  @Transform(({ value }) => new Date(value || null), { toPlainOnly: true })
  @Transform(
    ({ value }: { value: Timestamp }) =>
      typeof value === "string" ? value : value?.toDate().toISOString(),
    { toClassOnly: true }
  )
  endTime = ""

  @Expose({ name: "price" })
  price!: number | null

  public parse(dto: IAppointmentDTO | IAppointment) {
    Object.assign(this, plainToInstance(Appointment, dto))
  }

  static serialize(appointment: IAppointment): IAppointmentDTO {
    return instanceToPlain(appointment) as IAppointmentDTO
  }

  constructor(appointment?: IAppointment | IAppointmentDTO) {
    if (appointment) {
      this.parse(appointment)
    }
  }

  @Exclude()
  public save = async () => {
    const { id, ...payload } = Appointment.serialize(this)

    assert(payload, "Save a valid appointment")

    const controller = new AppointmentController()

    await controller.saveAppointment(payload)
  }

  @Exclude()
  static getAllAppointments = (callback: (res: Appointment[]) => void) => {
    assert(callback, "A callback must be provided")

    const controller = new AppointmentController()

    const unsub = controller.getAppointments(appointmentsDTO => {
      const appointments = [] as Appointment[]
      appointmentsDTO.forEach(dto => appointments.push(new Appointment(dto)))
      callback(appointments)
    })

    return unsub
  }
}
