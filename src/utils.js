/**
 * Генерирует уникальный код на основе счётчика
 * @returns {number|number}
 */
export function counter() {
  return counter.value ? ++counter.value : counter.value = 1;
}

/** 
 *  Склонение числительных 
 *  Не понимаю, зачем тащить simplur, целую библиотеку
 */

export function declOfNum(number, titles) {
  const cases = [2, 0, 1, 1, 1, 2];
  return titles[(number % 100 > 4 && number % 100 < 20) ? 2 : cases[(number % 10 < 5) ? number % 10 : 5]];
}

/** 
 *  Функция, считающая сумму товаров их общую стоимость
 */

export function getMeta(cart) {
  let count = 0;
  let price = 0;
  for (const item of cart) {
    count += item.count;
    price += item.price * item.count;
  }
  return (
    [count, price]
  )
}
