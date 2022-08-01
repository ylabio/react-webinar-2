/**
 * Генерирует уникальный код на основе счётчика
 * @returns {number|number}
 */
export function counter() {
  return counter.value ? ++counter.value : (counter.value = 1);
}

export function pluralCheck(value, words) {
  const modValue = Math.abs(value) % 100;

  const number = value % 10;

  if (modValue > 10 && modValue < 20) return words[0];
  if (number > 1 && number < 5) return words[1];
  if (number === 1) return words[0];

  return words[0];
}
