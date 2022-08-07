/**
 * Генерирует уникальный код на основе счётчика
 * @returns {number|number}
 */
export function counter(){
  return counter.value ? ++counter.value : counter.value = 1;
}

export function getTotalPrice(arr) {
  return arr && arr.reduce((sum, arr) => sum + (arr.price * arr.count), 0)
}

export function getTotalCount(arr) {
  return arr && arr.reduce((sum, arr) => sum + arr.count, 0)
}
