/**
 * Генерирует уникальный код на основе счётчика
 * @returns {number|number}
 */
export function counter(){
  return counter.value ? ++counter.value : counter.value = 1;
}

export function getAllCartItemsCost(cartItems){
  return cartItems.reduce((sum, val) => sum + val.price * val.count, 0);
}
