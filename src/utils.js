/**
 * Генерирует уникальный код на основе счётчика
 * @returns {number|number}
 */
export function counter(){
  return counter.value ? ++counter.value : counter.value = 1;
}

export function convertPrice(price,locales,currency) {
  return price.toLocaleString(locales, {style:'currency', currency:currency, minimumFractionDigits: 0})
}

export function getTotal(cart){ 
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

  const totalPrice = convertPrice(sum, 'ru', 'RUB');

  return [cartCount, totalPrice];
}


export function addCartItem(cart,item) {
  return {
    ...cart,
    [item.code]: {
      ...item,
      count: cart[item.code] && cart[item.code].count + 1 || 1
    }
  }
}

export function deleteCartItem(cart,code){
  const newCart = {...cart}
  delete newCart[code];
  return newCart;
}
