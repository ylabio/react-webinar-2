/**
 * Генерирует уникальный код на основе счётчика
 * @returns {number|number}
 */
export function counter(){
  return counter.value ? ++counter.value : counter.value = 1;
}
export function decNum (count) {
  const dec = ['раз','раза'];
  const num = count % 10;
    if (count >= 12 && count <= 14) {
      return `| Выделялось ${count} ${dec[0]}`
    } else if (num >= 2 && num <= 4) {
      return `| Выделялось ${count} ${dec[1]}`
    } else {
      return `| Выделялось ${count} ${dec[0]}`
    }
}   
