/**
 * Генерирует уникальный код на основе счётчика
 * @returns {number|number}
 */
export function counter(){
  return counter.value ? ++counter.value : counter.value = 1;
}

export function getTotal(cartInfo) {
  let total = 0;
  cartInfo.map(item => {
    total += item.price * item.count;
  })
  return Number(total);
}