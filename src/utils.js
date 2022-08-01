/**
 * Генерирует уникальный код на основе счётчика
 * @returns {number|number}
 */
export function counter() {
  return counter.value ? ++counter.value : counter.value = 1;
}

export function pluralize(number, cases) {
  let n = Math.abs(number) % 100;
  let a = n % 10;

  if (n >= 0 && n < 2 || n > 4 && n < 22) {
    return cases[0];
  }
  if (n > 1 && n < 5 || a > 1 && a < 5) {
    return cases[1];
  }
  return cases[0];
}