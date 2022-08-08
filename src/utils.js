/**
 * Генерирует уникальный код на основе счётчика
 * @returns {number|number}
 */
export function counter() {
  return counter.value ? ++counter.value : (counter.value = 1);
}

export const currencySign = `\u20BD`;

export function arrayToCart(items) {
  return Object.values(
    items.reduce((acc, curr) => {
      if (acc[curr.code]) {
        acc[curr.code] = {...curr, amount: ++acc[curr.code].amount};
        return acc;
      } else {
        acc[curr.code] = {...curr, amount: 1};
        return acc;
      }
    }, {})
  );
}
