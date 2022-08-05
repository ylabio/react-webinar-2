/**
 * Генерирует уникальный код на основе счётчика
 * @returns {number|number}
 */
export function counter(){
  return counter.value ? ++counter.value : counter.value = 1;
}
/**
 * Функция для подсчёта общей стоимости айтемов в корзине
 * @param {{price: number, count: number}[]} cart Массив айтемов вида, который подсвечивает идешка
 * @returns Общая стоимость 
 */
export function getCartCost(cart){
  let cost = 0
  cart.forEach(el => cost += el.price * el.count)
  return cost 
}