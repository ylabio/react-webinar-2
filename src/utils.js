import { func } from "prop-types";

/**
 * Генерирует уникальный код на основе счётчика
 * @returns {number|number}
 */
export function counter(){
  return counter.value ? ++counter.value : counter.value = 1;
}

export function convertPrice(price, locales, currency) {
  return price.toLocaleString(
    locales, {style: 'currency', currency: currency, minimumFractionDigits: 0}
  );
}

export function getSum(basket) {
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

  const sumPrice = convertPrice(sum, 'ru', 'RUB');

  return {basketCount, sumPrice};
}

export function addBasketItem(basket, item) {
  return {
    ...basket,
    [item.code]: {
      ...item,
      count: basket[item.code] && basket[item.code].count + 1 || 1
    }
  }
}

export function deleteItemBasket(basket, code) {
  const newBasket = {...basket}
  delete newBasket[code];
  return newBasket;
}
