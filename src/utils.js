import plural from "plural-ru";

/**
 * Плюрализирует (склоняет) существительные + плейсхолдер для числа
 * @param n {number} число, от которого зависит плюрализация
 * @param a {string} // файл
 * @param b {string} // файла
 * @param c {string} // файлов
 * @returns {string} // 4 файла
 */
export function toPlural(n, a, b, c){
  return plural(n, `%d ${a}`, `%d ${b}`, `%d ${c}`);
}

/**
 * Генерирует уникальный код на основе счётчика
 * @returns {number|number}
 */
export function counter(){
  return counter.value ? ++counter.value : counter.value = 1;
}

/**
 * Переводит число N в строку 'N ₽'
 * @param number {number} Цена в рублях 7955320
 * @returns {string} 7 955 320 ₽
 */
export function toRubPrice(number){
  return `${number.toLocaleString('ru')} ₽`;
}

/**
 * Выводит стоимость всех товаров в корзине в формате '7 955 320 ₽'
 * @param cartItems {Array} Массив товаров из корзины
 * @returns {string} в формате 7 955 320 ₽
 */
export function getAllPrice(cartItems){
  return toRubPrice(cartItems.reduce((sum, val) => sum + val.price * val.amount, 0));
}