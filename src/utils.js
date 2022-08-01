/**
 * Генерирует уникальный код на основе счётчика
 * @returns {number|number}
 */
export function counter() {
  return counter.value ? ++counter.value : counter.value = 1;
}

export function showTimes(number) {
  const remainder  = number % 10;
  let word = 'раз';
  if (number >= 11 && number <= 21) {
    word = 'раз'
  } else if (remainder  >= 2 && remainder  <= 4) {
    word = 'раза'
  }
  return `${number + ' ' + word}`;
}

