/**
 * Генерирует уникальный код на основе счётчика
 * @returns {number|number}
 */
export function counter() {
  return counter.value ? ++counter.value : (counter.value = 1);
}

// склоняет окончание
export const raz = (n) => {
  if (n % 10 === 2 || n % 10 === 3 || n % 10 === 4) {
    if (n === 12 || n === 13 || n === 14) {
      return "раз";
    }
    return "раза";
  }
  return "раз";
};
