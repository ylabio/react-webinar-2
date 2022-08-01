/**
 * Генерирует уникальный код на основе счётчика
 * @returns {number|number}
 */
export function counter() {
  return counter.value ? ++counter.value : counter.value = 1;
}

/**
 * Склоняет существительное "раз" на основе числа
 * @returns {string|string}
 */
export function getNoun(number) {
  if ([2, 3, 4].includes(number % 10) && ![12, 13, 14].includes(number % 100)) {
    return 'раза';
  }
  return 'раз';
}