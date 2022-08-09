/**
 * Генерирует уникальный код на основе счётчика
 * @returns {number|number}
 */
export function counter(){
  return counter.value ? ++counter.value : counter.value = 1;
}
/**
 * Суммирует цену товара с учетом количества
 * @returns {number}
 */
export function calcPrice(array) {
    let summ = 0;
    array.map((el) => {
      summ += el.price * el.quantity;
    });
    return summ.toLocaleString();
  }
  /**
 * Суммирует общее количество товаров в массиве
 * @returns {number}
 */
  export function calcQuantity(array) {
    let quantity = 0;
    array.map((el) => {
      quantity += el.quantity;
    });
    return quantity;
  }
/**
 * Суммирует количество уникального товара
 * @returns {number}
 */
  export function calcUnicalItems(array) {
  let count = 0;
  array.map((el) => {
    if (el.quantity === 1) {
      count += 1;
    } else if (el.quantity > 1) {
      count += 1;
    }
  });
  return count;
  }
