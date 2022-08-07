/**
 * Генерирует уникальный код на основе счётчика
 * @returns {number|number}
 */
export function counter(){
  return counter.value ? ++counter.value : counter.value = 1;
}

// Разделение стоимость на разряды
export function divideOnDigits(num) {
  return `${new Intl.NumberFormat('ru-RU').format(num)}`
}