/**
 * Форматирование разрядов числа
 * @param value
 * @param options
 * @returns {string}
 */
export default function dateFormat(value, options = {}){
  return new Intl.DateTimeFormat('ru-RU', options).format(Date.parse(value))
}

