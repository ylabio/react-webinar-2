/**
 * Генерирует уникальный код на основе счётчика
 * @returns {number|number}
 */
export function counter() {
  return counter.value ? ++counter.value : (counter.value = 1);
}

export function selectCountCondition(x) {
  return x !== 0 && ` | Выделялся ${x} 
  ${((x % 10 === 2 || x % 10 === 3 || x % 10 === 4) 
  && x !== 12 && x !== 13 && x !== 14) 
  ?'раза'
  :'раз'}`
};