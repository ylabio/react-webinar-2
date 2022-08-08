/**
 * Генерирует уникальный код на основе счётчика
 * @returns {number|number}
 */
export function counter(){
  return counter.value ? ++counter.value : counter.value = 1;
}

export function useCartCalc(cart) {
  const products = Object.values(cart);

  const { cartCount, sum } = products.reduce((total, product) => {
    return {
      ...total,
      cartCount: products.length,
      sum: total.sum + (product.price * product.count),
    }
  }, {
    cartCount: 0,
    sum: 0,
  });

  const totalPrice = sum.toLocaleString(
    'ru', {style: 'currency', currency: 'RUB', minimumFractionDigits: 0}
  );

  return [cartCount, totalPrice];
}
