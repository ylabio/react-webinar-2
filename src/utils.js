/**
 * Генерирует уникальный код на основе счётчика
 * @returns {number|number}
 */
export function counter(){
  return counter.value ? ++counter.value : counter.value = 1;
}
/**
 *  Подсчет общей суммы товаров
 */
 export function priceReduce(array) {
  return array && array.reduce((total, arr) => total + (arr.price * arr.count), 0)
}


export function formatPrice(price) {
 return new Intl.NumberFormat("ru-RU", {
    style: "currency",
    currency: "RUB",
    currencyDisplay: "symbol",
    maximumFractionDigits: 0,
    }).format(price)
}
