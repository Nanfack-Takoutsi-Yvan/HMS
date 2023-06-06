import db from "@db/firestore"
import { collection, addDoc, onSnapshot, query } from "firebase/firestore"

export default class AppointmentController implements IAppointmentController {
  private resource

  constructor() {
    this.resource = "appointments"
  }

  public saveAppointment = async (payload: IAppointmentDTO) => {
    try {
      const colRef = collection(db, this.resource)
      const docRef = await addDoc(colRef, payload)

      return docRef.id
    } catch (err) {
      throw new Error(err as any)
    }
  }

  public getAppointments = (callback: (res: IAppointmentDTO[]) => void) => {
    try {
      const colRef = collection(db, this.resource)
      const dbQuery = query(colRef)

      const unSubscribe = onSnapshot(dbQuery, docs => {
        const appointments = [] as IAppointmentDTO[]

        docs.forEach(document => {
          const appointment = document.data() as unknown as IAppointmentDTO
          appointments.push({ ...appointment, id: document.id })
        })

        callback(appointments)
      })

      return unSubscribe
    } catch (err) {
      throw new Error(err as any)
    }
  }
}
