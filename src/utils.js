/**
 * Генерирует уникальный код на основе счётчика
 * @returns {number|number}
 */
export function counter() {
  return counter.value ? ++counter.value : counter.value = 1;
}

export function showTimes(number) {
  let word = 'раз';
  if (number >= 11 && number <= 21) {
    word = 'раз'
  } else if (number % 10 >= 2 && number % 10 <= 4) {
    word = 'раза'
  }
  return `${number + ' ' + word}`;
}

