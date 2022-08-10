import plural from 'plural-ru';

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

// Получение данных для вывода в Control
export function getDataForControl(sum, price) {
  return `${sum} ${plural(sum, 'товар', 'товара', 'товаров')} /  ${getPriceOnRub(price)}`
}

