/**
 * Генерирует уникальный код на основе счётчика
 * @returns {number|number}
 */
export function counter(){
  return counter.value ? ++counter.value : counter.value = 1;
}

/**
 * Форматирует число в цену
 * @returns {string}
 */
 export function getFormattedPrice(value){
  return value.toLocaleString('RU-ru', {style: 'currency', currency: 'RUB', maximumFractionDigits: 0})
}

