export default function dateFormating(str) {
  var date = new Date(str);
  let dayAndMonth = date.toLocaleString('ru', { day: 'numeric', month: 'long' });
  let year = date.getFullYear();
  let hour = date.toLocaleString('ru', { hour: 'numeric' });
  let minute = date.getMinutes();
  if (minute < 10) {
    minute = '0' + minute;
  }
  return dayAndMonth + ' ' + year + ' в ' + hour + ':' + minute;
}