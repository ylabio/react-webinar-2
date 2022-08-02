/**
 * Генерирует уникальный код на основе счётчика
 * @returns {number|number}
 */
export function counter() {
  return counter.value ? ++counter.value : (counter.value = 1);
}

export const renderPhrase = (number) => {
  const lastOne = Number(number.toString().slice(-1));
  if (number > 4 && number < 15) {
    return `Выделялось ${number} раз`;
  }
  if (lastOne === 1) return `Выделялось ${number} раз`;
  if ([2, 3, 4].indexOf(lastOne) >= 0) return `Выделялось ${number} раза`;
  return `Выделялось ${number} раз`;
};
