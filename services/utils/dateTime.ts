import moment from 'moment'

export const getTime = (isoDateTime: string) => {
  const dateTime = moment(isoDateTime);
  return dateTime.format('HH:mm A');
}