import moment from 'moment'
moment.locale('ru')

export default function dateFormat(date) {
  return moment(date).format('D MMMM YYYY [в] h:mm')
}