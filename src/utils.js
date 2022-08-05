/**
 * Генерирует уникальный код на основе счётчика
 * @returns {number|number}
 */
export function counter(){
  return counter.value ? ++counter.value : counter.value = 1;
}

/**
 * Возвращает цену в виде форматированной строки
 * @returns {string}
 */
export function getFormattedPrice(num) {
  return new Intl.NumberFormat('ru-RU', {
    style: 'currency',
    currency: 'RUB',
    maximumFractionDigits: 0
  }).format(num);
}

/**
 * Возвращает общую стоимость всех товаров в корзине
 * @returns {number}
 */
export function getTotalPrice(goods) {
  return goods.reduce((accum, good) => accum + good.amount * good.price, 0);
}