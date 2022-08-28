/**
 * Форматирование даты
 * @param value
 * @param options
 * @returns {string}
 */
 export default function dateFormat(date){
  const options = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      timezone: 'UTC',
      hour: 'numeric',
      minute: 'numeric'
  }
  const newDate = new Date(date)
  return newDate.toLocaleString('ru', options).replace(',', ' в').replace(' г.', '')
}
