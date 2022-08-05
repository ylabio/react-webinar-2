/**
 * Генерирует уникальный код на основе счётчика
 * @returns {number|number}
 */
export function counter(){
  return counter.value ? ++counter.value : counter.value = 1;
}

export const getSumPrice = (products) => {
  let allProductsPrices = []
  products.map(product => allProductsPrices.push(product.price * product.count));
  const sumResult = allProductsPrices.reduce(function(sum, elem) {
    return sum + elem;
  }, 0);
  return Intl.NumberFormat("ru").format(sumResult);
}
