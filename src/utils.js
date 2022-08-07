import React from "react";
import plural from "plural-ru";
import NumberFormat from "react-number-format";

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
 * Обеспечивает форматирование вывода чисел
 * @param num {number} число для форматирования
 * @returns {React.ReactElement}
 */
export function numFormat(num) {
  return (
    <NumberFormat value={num} displayType={"text"} thousandSeparator={" "} />
  );
}

/**
 * Получает стоимость товара
 * @param code {number} id товара
 * @param array {Array.<{code: number, title: string, price: number}>} каталог товаров
 * @returns {number}
 */
export function getPrice(code, array) {
  return array.find((item) => item.code === code).price;
}

/**
 * Получает название товара
 * @param code {number} id товара
 * @param array {Array.<{code: number, title: string, price: number}>} каталог товаров
 * @returns {string}
 */
export function getTitle(code, array) {
  return array.find((item) => item.code === code).title;
}

/**
 * Изменяет данные о количестве товара в корзине
 * @param code {number} id товара
 * @param cart {Array.<{code: number, qty: number}>} предыдущий перечень товаров в корзине
 * @param increment {bool} true = добавить / false = убрать товар
 * @returns {Array.<{code: number, qty: number}>}
 */
export function cartQtyUpdate(code, cart, increment) {
  // Ищет товар в корзине
  const index = cart.findIndex((item) => item.code === code);
  const newCart = [...cart];
  // Обновляет информацию о количестве товара
  newCart[index] = {
    code: code,
    qty: increment ? ++cart[index].qty : --cart[index].qty,
  };
  return newCart;
}
