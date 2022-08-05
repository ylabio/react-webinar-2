/**
 * Генерирует уникальный код на основе счётчика
 * @returns {number|number}
 */
export function counter(){
  return counter.value ? ++counter.value : counter.value = 1;
}

export function useBasket(basket) {
  const products = Object.values(basket);

  const { basketCount, sum } = products.reduce((summary, product) => {
    return {
      ...summary,
      basketCount: products.length,
      sum: summary.sum + (product.price * product.count),
    }
  }, {
    basketCount: 0,
    sum: 0,
  });

  const sumPrice = sum.toLocaleString(
    'ru', {style: 'currency', currency: 'RUB', minimumFractionDigits: 0}
  );

  return [basketCount, sumPrice];
}
