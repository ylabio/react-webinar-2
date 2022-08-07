/**
 * Генерирует уникальный код на основе счётчика
 * @returns {number|number}
 */
export function counter(){
  return counter.value ? ++counter.value : counter.value = 1;
}

export function getFullCostOfCart(cart){
  let cost = 0;
  cart.forEach((item) => {
    cost += item.count * item.price;
  })
  return cost
}
