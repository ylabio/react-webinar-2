/**
 * Генерирует уникальный код на основе счётчика
 * @returns {number|number}
 */
export function counter(){
  return counter.value ? ++counter.value : counter.value = 1;
}

// Разделение стоимости на разряды
export function divideOnDigits(price) {
  return `${new Intl.NumberFormat('ru-RU').format(price)} ₽`;
}

// Подсчет суммы товаров в корзине
