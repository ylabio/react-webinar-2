/**
 * Генерирует уникальный код на основе счётчика
 * @returns {number|number}
 */
export function counter(){
  return counter.value ? ++counter.value : counter.value = 1;
}

// Получение стоимости в рублях, с разделением числа на разряды
export function getPriceOnRub(price) {
  return `${new Intl.NumberFormat('ru-RU').format(price)} ₽`;
}

// Получение стоимости всех товаров в корзине
export function getAllPrice(itemsInCart) {
  return itemsInCart.reduce((sum, item) => sum + item.price * item.count, 0)
}
