/**
 * Генерирует уникальный код на основе счётчика
 * @returns {number|number}
 */
export function counter(){
  return counter.value ? ++counter.value : counter.value = 1;
}

/**
 * Показывает числовой формат в рублях
 * @returns {string}
 */
export function currency(sum) {
  return sum.toLocaleString('ru-RU', { 
    style: 'currency', 
    currency: 'RUB', 
    minimumFractionDigits: 0 
  })
}
