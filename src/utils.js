/**
 * Генерирует уникальный код на основе счётчика
 * @returns {number|number}
 */
export function counter(){
  return counter.value ? ++counter.value : counter.value = 1;
}

/**
 * Считает общую сумму таваров в корзине
 * @returns {number}
 */

export function total (cart) {
  return  cart.reduce((sum, prod) => sum + prod.price * prod.count, 0)
}

/**
 * Форматирует число в валюту
 * @returns {string}
 */
export function formattingNumber (value) {
  return  value.toLocaleString('ru-RU', {
    style: 'currency',
    currency: 'RUB',
    minimumFractionDigits: 0
  })
}
