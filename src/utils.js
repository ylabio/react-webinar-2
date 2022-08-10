/**
 * Генерирует уникальный код на основе счётчика
 * @returns {number|number}
 */
export function counter(){
  return counter.value ? ++counter.value : counter.value = 1;
}

/**
 * Формирует представление цены в зависимости от валюты
 * @param {number} price - цена
 * @returns - сформированная под валюту цена (100 000 Р)
 */
export function getCurrencyPrice(price, currency = 'RUB') {
  return price.toLocaleString('ru-RU', {
    style: 'currency',
    currency,
    minimumFractionDigits: 0
    });
}