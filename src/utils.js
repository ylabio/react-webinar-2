/**
 * Генерирует уникальный код на основе счётчика
 * @returns {number|number}
 */
export function counter(){
  return counter.value ? ++counter.value : (counter.value = 1);
}

export const countNumber = (num) => {
  let str = '';
  let newNum = num % 10;
  if ((num > 4 && num < 22) || num === 1 || (newNum > 4 || newNum === 0 || newNum === 1)) {return str +="раз"}
    else if (num > 1 && num < 5 || (newNum > 1 && newNum < 5)) {return str +="раза"}
    return str;
}
