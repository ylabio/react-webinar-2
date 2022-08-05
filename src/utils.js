/**
 * Генерирует уникальный код на основе счётчика
 * @returns {number|number}
 */
export function counter(){
  return counter.value ? ++counter.value : counter.value = 1;
}


export function getCartCost(cart){
  let cost = 0
  cart.forEach(el => cost += el.price * el.count)
  return cost 
}
export function getCartLength(cart){
  let len = 0
  cart.forEach(el => len += el.count)
  return len
}