/**
 * Генерирует уникальный код на основе счётчика
 * @returns {number|number}
 */
export function counter(){
  return counter.value ? ++counter.value : counter.value = 1;
}

export const checkA = (num) => {
  if (num >= 2 && num <= 4 ) return true
  if ( String(num).match(/^\d*[^1][2,3,4]+$/) ) return true
  return false
}