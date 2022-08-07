/**
 * Генерирует уникальный код на основе счётчика
 * @returns {number|number}
 */
export function counter(){
  return counter.value ? ++counter.value : counter.value = 1;
}

const options = { style: 'currency', currency: 'RUB', minimumFractionDigits: 0 };
const numberFormat = new Intl.NumberFormat('ru-RU', options);
export function getPriceFormatter(){
  return numberFormat;
}