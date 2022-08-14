/**
 * Форматирование разрядов числа
 * @param value
 * @param options
 * @returns {string}
 */
export default function numberFormat(value, options = {}){
  return new Intl.NumberFormat('ru-RU', options).format(value)
}
