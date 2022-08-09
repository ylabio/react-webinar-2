/**
 * Генерирует уникальный код на основе счётчика
 * @returns {number|number}
 */
export function counter() {
  return counter.value ? ++counter.value : counter.value = 1;
}

/**
 * Высчитывает уникальных товаров в корзине
 */

export function sumCalculated(cartItems) {
  return cartItems.reduce((prev, item) => prev + item.price * item.quantity, 0);
}

/**
 * Высчитывает итоговую стоимость всех добавленных в корзину товаров
 */

export function sumQuantity(cartItems) {
  return cartItems.length;
}

/**
 * Формат цены (каждые 3 символа пробел)
 */

export function priceFormat(price) {
  return price.toLocaleString('ru-RU')
}