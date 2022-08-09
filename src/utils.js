/**
 * Генерирует уникальный код на основе счётчика
 * @returns {number|number}
 */
export function counter() {
  return counter.value ? ++counter.value : counter.value = 1;
}

export function pluralProduct(amount) {
  if (amount === 1) {
    return 'товар'
  } else if (amount > 4) {
    return 'товаров'
  }
  return 'товара'

}
