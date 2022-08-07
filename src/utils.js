/**
 * Генерирует уникальный код на основе счётчика
 * @returns {number|number}
 */
export function counter(){
  return counter.value ? ++counter.value : counter.value = 1;
}

/**
 * Возвращает сумму переданного свойств объекта из массива объектов
 * @returns {number}
 */

export function getSumArrayProperties(arr, property) {
  return arr.reduce((acc, curr) => {
    return acc + (curr[property] * curr.quantity);
  }, 0)
}

/**
 * Возвращает подготовленный прайс в рублях
 * @returns {string}
 */

export function getPrice(value) {
  return new Intl.NumberFormat('ru-RU', {
    style: 'currency',
    currency: 'RUB',
    minimumFractionDigits: 0
  }).format(value)
}
