/**
 * Генерирует уникальный код на основе счётчика
 * @returns {number|number}
 */
export function counter(){
  return counter.value ? ++counter.value : counter.value = 1;
}

/**
 * Форматирует число в правильный вид написания курса рубля
 * @returns {number}
 */
export function formatNumber(num){
  return `${num}`.split('').reverse().map((el, index) => index % 3 !== 2 ? el : ` ${el}`).reverse().join('') // функция взята с сайта https://qna.habr.com/q/599927
}
