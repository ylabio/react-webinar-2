/**
 * Генерирует уникальный код на основе счётчика
 * @returns {number|number}
 */
export function counter(){
  return counter.value ? ++counter.value : counter.value = 1;
}

const CURRENCY_FORMATTER = new Intl.NumberFormat(undefined, {
  currency: 'RUB',
  style: 'currency',
  minimumFractionDigits: 0,
});

export const plural = require('plural-ru')
