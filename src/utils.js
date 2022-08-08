/**
 * Генерирует уникальный код на основе счётчика
 * @returns {number|number}
 */
export function counter() {
  return counter.value ? ++counter.value : (counter.value = 1);
}

export function allBuy(array) {
  return array
    .reduce((acc, curr) => acc + curr.price * curr.total, 0)
    .toLocaleString("ru-RU");
}
