/**
 * Генерирует уникальный код на основе счётчика
 * @returns {number|number}
 */
export function counter() {
  return counter.value ? ++counter.value : (counter.value = 1);
}

export function mergeItems(items) {
  if (!items.length) return [];

  const consolidationItems = new Map();

  for (let item of items) {
    let uniqueItems = items.filter(({ code }) => code === item.code);
    consolidationItems.set(item.code, {
      ...item,
      totalPrice: item.price * uniqueItems.length,
      count: uniqueItems.length,
    });
  }
  return [...consolidationItems.values()];
}

export function countingTotalPriceAllItems(items) {
  return items.reduce((prev, item) => prev + item.totalPrice, 0);
}
