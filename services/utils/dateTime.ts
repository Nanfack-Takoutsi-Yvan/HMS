import moment from "moment"

export const getTime = (isoDateTime: string) => {
  const dateTime = moment(isoDateTime)
  return dateTime.format("HH:mm A")
}

export const getUTCTime = (value: string) => {
  const dateTime = moment(value)
  return dateTime.toISOString()
}
