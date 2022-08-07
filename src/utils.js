/**
 * Генерирует уникальный код на основе счётчика
 * @returns {number|number}
 */
export function counter(){
  return counter.value ? ++counter.value : counter.value = 1;
}

export function numberWithSpace(num) {
  const result = [];
  while (num > 1000) {
    result.push(num % 1000);
    num = Math.floor(num / 1000);
  }
  result.push(num);
  return result.reverse().join(' ');
}
