/**
 * Генерирует уникальный код на основе счётчика
 * @returns {number|number}
 */
export function counter(){
  return counter.value ? ++counter.value : counter.value = 1;
}
/**
 * Функция для подсчёта общей стоимости айтемов в корзине
 * @param {function} cb Код элемента
 * @param {object} state Ссылка на состояние
 * @param {'add' | 'delete'} action Действие
 * @returns {number} Общая стоимость 
 */
export function getCartCost(cb, action, state){
  let cost = state.cart.cost
  switch (action) {
    case 'add':
      cost += state.items.find(cb).price
      break
    case 'delete':
      const item = state.cart.items.find(cb)
      cost -= item.price * item.count
      break
    default:
      throw new TypeError('Неизвестный экшн')
  }
  return cost
}