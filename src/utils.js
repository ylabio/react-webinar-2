/**
 * Генерирует уникальный код на основе счётчика
 * @returns {number|number}
 */
export function counter() {
  return counter.value ? ++counter.value : counter.value = 1;
}

/**
 * Генерирует уникальный код элемента корзины
 * @returns {number|number}
 */
export function cartCounter() {
  return cartCounter.value ? ++cartCounter.value : cartCounter.value = 1;
}

/**
 * Высчитывает уникальных товаров в корзине
 */

export function sumCalculated(cartItems) {
  cartItems.reduce((prev, item) => prev + item.price, 0)
}

/**
 * Высчитывает итоговую стоимость всех добавленных в корзину товаров
 */