/**
 * Генерирует уникальный код на основе счётчика
 * @returns {number|number}
 */
export function counter(){
  return counter.value ? ++counter.value : counter.value = 1;
}

/**
 * Принимает число и возвращает строку с числом в формате российского рубля.
 * @param value - значение для форматирования
 * @returns Функция, которая принимает значение и возвращает отформатированную строку.
 */
export function formatToRUB(value) {
  return new Intl.NumberFormat('ru-RU', {
    style: 'currency',
    currency: 'RUB',
    currencyDisplay: 'symbol',
    maximumFractionDigits: 0,
  }).format(value);
}