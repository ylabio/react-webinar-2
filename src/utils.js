/**
 * Генерирует уникальный код на основе счётчика
 * @returns {number|number}
 */
export function counter(){
  return counter.value ? ++counter.value : counter.value = 1;
}

/**
 * Форматирование разрядов числа
 * @param value
 * @param options
 * @returns {string}
 */
export function numberFormat(value, options = {}){
  return new Intl.NumberFormat('ru-RU', options).format(value)
}
