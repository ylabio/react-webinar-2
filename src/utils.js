/**
 * Генерирует уникальный код на основе счётчика
 * @returns {number|number}
 */
export function counter() {
  return counter.value ? ++counter.value : counter.value = 1;
}

/**
 * Возвращает строку на основе числа в формате "123 456,79"
 * @param number {number}
 * @returns {string}
 */
export function getFormattedNumber(number) {
  return new Intl.NumberFormat('ru').format(number);
}

/**
 * Считает сумму значений массива объектов на основе полей "price" и "quantity"
 * @param array {Object[]}
 * @returns {string}
 */
export function getTotalCost(array) {
  const total = array.reduce((previousValue, currentValue) => {
    return previousValue + currentValue.price * currentValue.quantity;
  }, 0);

  return getFormattedNumber(total);
}
