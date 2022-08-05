/**
 * Генерирует уникальный код на основе счётчика
 * @returns {number|number}
 */
export function counter() {
  return counter.value ? ++counter.value : counter.value = 1;
}

/**
 * Сумирует товары в корзине
 * @returns {number}
 */
export const sumProducts = (cart, items) => {
  let sum = 0
  cart.map(({code, count}) => {
    const index = items.findIndex(item => item.code === code)
    sum = sum + items[index].price * count
  })
  return sum
}

/**
 * Форматирует число в российский числовой формат
 * @returns {string}
 */
export const numberFormat = (number) => {
  return new Intl.NumberFormat('ru-RU', {
    style: 'currency',
    currency: 'RUB',
    minimumFractionDigits: 0
  }).format(number);
}