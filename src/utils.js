/**
 * Генерирует уникальный код на основе счётчика
 * @returns {number|number}
 */
export function counter(){
  return counter.value ? ++counter.value : counter.value = 1;
}

export function formatter(number){
  return new Intl.NumberFormat('ru', {
    style: 'currency',
    currency: 'RUB',
    minimumFractionDigits: 0
  }).format(number)
}
