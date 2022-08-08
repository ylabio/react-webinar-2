/**
 * Генерирует уникальный код на основе счётчика
 * @returns {number|number}
 */
export function counter(){
  return counter.value ? ++counter.value : counter.value = 1;
}

export function formatNumber(num){
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
}
