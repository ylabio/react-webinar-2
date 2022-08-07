/**
 * Генерирует уникальный код на основе счётчика
 * @returns {number|number}
 */
export function counter(){
  return counter.value ? ++counter.value : counter.value = 1;
}

/**
 * Высчитывает общую стоимость товаров в принимаемом списке
 * @returns {number|number}
 */
 export function getTotalPrice(items) {
  const bucketTotalPrice = items.length > 0
    ? items.reduce((acc, item) => acc + item.price * item.amount, 0)
    : 0;

  return bucketTotalPrice;
}
