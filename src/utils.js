/**
 * Генерирует уникальный код на основе счётчика
 * @returns {number|number}
 */
export function counter(){
  return counter.value ? ++counter.value : counter.value = 1;
}

/**
 * Возвращает общую сумму всех товаров в корзине
 * @returns {number|number}
 */
 export function calcPrice(cartList){
  if (cartList === undefined || cartList.length === 0 ) {
    return 0;
  } else {
    return cartList.reduce((acc, curr) => {
      return acc + curr.price * curr.count;
    }, 0);
  }
}
