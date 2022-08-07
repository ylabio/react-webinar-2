/**
 * Генерирует уникальный код на основе счётчика
 * @returns {number|number}
 */
export function counter() {
  return counter.value ? ++counter.value : counter.value = 1;

}
/**
 * Сумма всех покупок 
 * @returns {number}
 */
export function sumBasket(items) {
  let sum = 0;
  items.forEach(value => sum = sum + value.price * value.count)
  return sum
}


