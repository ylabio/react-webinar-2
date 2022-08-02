/**
 * Генерирует уникальный код на основе счётчика
 * @returns {number|number}
 */
export function counter() {
  return counter.value ? ++counter.value : (counter.value = 1);
}

/**
 * Генерирует склонение слов: раз/раза
 */

export function declOfNumber(number) {
  number = Math.abs(number) % 100;
  const number1 = number % 10;
  if (number > 10 && number < 20) {
    return "раз";
  } else if (number1 > 1 && number1 < 5) {
    return "раза";
  } else if (number1 == 1) {
    return "раз";
  } else {
    return "раз";
  }
}
