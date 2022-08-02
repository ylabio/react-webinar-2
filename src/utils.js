/**
 * Генерирует уникальный код на основе счётчика
 * @returns {number|number}
 */
export function counter() {
  return counter.value ? ++counter.value : counter.value = 1;
}

const LAST_CHARS = ["2", "3", "4"];
const NUMBERS = [12, 13, 14];
const ZERO = 0;

export const countOfAllocateToString = (count) => {

  const string = count.toString();
  const lastChar = string.charAt(string.length - 1);

  if (count === ZERO) {
    return ``
  }

  if (LAST_CHARS.includes(lastChar) && !NUMBERS.includes(count)) {
    return ` | Выдлился ${count} раза.`;
  }

  return ` | Выдлился ${count} раз.`;
};
