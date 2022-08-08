/**
 * Генерирует уникальный код на основе счётчика
 * @returns {number|number}
 */
export function counter(){
  return counter.value ? ++counter.value : counter.value = 1;
}
/**
 * Склоняет слово в зависимости от числа
 * @returns {string}
 */
//Источник: https://realadmin.ru/coding/sklonenie-na-javascript.html
export function declOfNum(number, words) {
  return words[
    number % 100 > 4 && number % 100 < 20
      ? 2
      : [2, 0, 1, 1, 1, 2][number % 10 < 5 ? Math.abs(number) % 10 : 5]
  ];
}
/**
 * Суммирует цену товара с учетом количества если передан 'price"'
 * суммирует общее количество если передан 'quantity'
 * суммирует количество уникального товара, если передан 'unicalCount'
 * @returns {number}
 */
export function calcSumm(array, arg) {
  if (arg === "price") {
    let summ = 0;
    array.map((el) => {
      summ += el.price * el.quantity;
    });
    return summ.toLocaleString();
  }
  if (arg === "quantity") {
    let quantity = 0;
    array.map((el) => {
      quantity += el.quantity;
    });
    return quantity;
  }
    if (arg === "unicalCount") {
    let count = 0;
    array.map((el) => {
      if(el.quantity === 1){
        count+=1;
      }
      else if(el.quantity >1){
        count+=1;
      }
    });
    return count;
  }
}
