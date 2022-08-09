/**
 * Генерирует уникальный код на основе счётчика
 * @returns {number|number}
 */
export function counter(){
  return counter.value ? ++counter.value : counter.value = 1;
}

export function sumCart(cart){
  return cart.reduce((reducer,item)=>{
    return reducer += (item.price * item.count);
  },0)
}

