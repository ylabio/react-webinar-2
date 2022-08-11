/**
 * Подсчитывает цену всех товаров в корзине
 * @returns {number|number}
 */
export const calculatePrice = (orders) => {
  if (orders === undefined) {
    return 0;
  } else if (orders.length === 0) {
    return 0;
  } else {
    return orders.reduce((acc, curr) => {
      return acc + curr.price * curr.count;
    }, 0);
  }
};
export const calculateCount = (cardItems) => {
  if (cardItems === undefined) {
    return 0;
  } else if (cardItems.length === 0) {
    return 0;
  } else {
    return cardItems.reduce((acc, curr) => {
      return acc + 1;
    }, 0);
  }
};
/**
 * преобразует число в строку с пробелами
 * @returns {string|string}
 */
export const changeNumber = (num) => {
  return num.toLocaleString("ru");
};
