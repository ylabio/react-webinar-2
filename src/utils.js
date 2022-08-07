/**
 * Генерирует уникальный код на основе счётчика
 * @returns {number|number}
 */
export function counter() {
  return counter.value ? ++counter.value : (counter.value = 1)
}

/**
 * Возвращает итоговую сумму из массива
 * @returns {number}
 */
export function calculateSumOfItems(array) {
  return array
    .map((item) => {
      return item.currentPrice
    })
    .reduce((prevVal, currentVal) => prevVal + currentVal, 0)
}

export function calculateQuantityOfItems(array) {
  return array
    .map((item) => {
      return item.quantity
    })
    .reduce((prevVal, currentVal) => prevVal + currentVal, 0)
}
