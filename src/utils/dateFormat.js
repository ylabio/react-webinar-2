import moment from 'moment'
moment.locale('ru')

export default function dateFormat(date) {
  return moment(date).format('LLL')
}