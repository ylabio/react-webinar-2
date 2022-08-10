/**
 * Генерирует уникальный код на основе счётчика
 * @returns {number|number}
 */
export function counter(){
  return counter.value ? ++counter.value : counter.value = 1;
}

export const plural = require('plural-ru')

const CURRENCY_FORMATTER = new Intl.NumberFormat(undefined, {
  style: 'currency',
  currency: 'RUB',
  minimumFractionDigits: 0,
});

export const formatCurrency = (number) => {
  return CURRENCY_FORMATTER.format(number)
}
