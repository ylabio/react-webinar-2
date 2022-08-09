import plural from "plural-ru";

/**
 * Генерирует уникальный код на основе счётчика
 * @returns {number|number}
 */
export function counter() {
  return counter.value ? ++counter.value : (counter.value = 1);
}

/**
 * Обеспечивает плюрализацию вывода
 * @param num {number} количество товаров
 * @returns {string}
 */
export function pluralize(num) {
  return plural(num, "товар", "товара", "товаров");
}

/**
 * Обеспечивает вывод чисел в формате: (3 цифры)(пробел)(3 цифры)
 * @param num {number} число для форматирования
 * @returns {string}
 */
export function numFormat(num) {
  let str = num.toString().split(".");
  str[0] = str[0].replace(/(?=(\d{3})+(?!\d))/g, " ");
  return str;
}

/**
 * Изменяет данные о количестве товара в корзине
 * @param item {{code: number, title: string, price: number, qty?: number}} объект товара
 * @param cart {Array.<{code: number, title: string, price: number, qty: number}>} предыдущий перечень товаров в корзине
 * @param increment {bool} true = добавить / false = убрать товар
 * @returns {Array.<{code: number, title: string, price: number, qty: number}>}
 */
export function cartQtyUpdate(item, cart, increment) {
  // Ищет товар в корзине
  const index = cart.findIndex((cartItem) => cartItem.code === item.code);
  const newCart = [...cart];
  // Обновляет информацию о количестве товара
  newCart[index] = {
    ...item,
    qty: increment ? ++cart[index].qty : --cart[index].qty,
  };
  return newCart;
}

/**
 * Подсчитывает общую стоимость товаров
 * @param cart {Array.<{code: number, title: string, price: number, qty: number}>} корзина с товарами
 * @returns {number}
 */
export function totalPrice(cart) {
  return cart.reduce((total, item) => item.qty * item.price + total, 0);
}

/**
 * Подсчитывает общее количество товаров в корзине
 * @param cart {Array.<{code: number, title: string, price: number, qty: number}>} корзина с товарами
 * @returns {number}
 */
export function totalQty(cart) {
  return cart.reduce((total, item) => item.qty + total, 0);
}
