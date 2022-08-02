/**
 * Генерирует уникальный код на основе счётчика
 * @returns {number|number}
 */
export function counter(){
  return counter.value ? ++counter.value : counter.value = 1;
}

/**
 * Проверяет, требует ли число после себя "раза", а не "раз" 
 * @param num
 * @returns {boolean}
 */
export function hasAnotherGenitive(num) {
  let lastDigit = num % 10;
  let prelastDigit = (num / 10 >> 0) % 10;
  return lastDigit >= 2 && lastDigit <= 4 && prelastDigit != 1;
}