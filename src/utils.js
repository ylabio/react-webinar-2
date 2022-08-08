/**
 * Генерирует уникальный код на основе счётчика
 * @returns {number|number}
 */
export function counter() {
  return counter.value ? ++counter.value : (counter.value = 1)
}
/**
 * Считает сумму всех элементов массива объектов учитавая ключи
 * @returns {number|number}
 */

export function sumElements(arr, itemKey) {
  return arr.reduce((acc, num) => acc + num[itemKey] * (num.count || 1), 0)
}
