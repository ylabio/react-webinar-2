/**
 * Генерирует уникальный код на основе счётчика
 * @returns {number|number}
 */
export function counter() {
  return counter.value ? ++counter.value : (counter.value = 1);
}

export function declension(number) {
  number %= 100;
  if (number >= 5 && number <= 20) {
    return "раз";
  }
  number %= 10;
  if (number === 1) {
    return "раз";
  }
  if (number >= 2 && number <= 4) {
    return "раза";
  }
  return "раз";
}
