import * as yup from "yup"

const createAppointmentSchema = yup.object().shape({
  location: yup.string().required("modal.errors.location"),
  price: yup.number().required("modal.errors.amount"),
  type: yup.string().required("modal.errors.type")
})

export default createAppointmentSchema
