/**
 * Генерирует уникальный код на основе счётчика
 * @returns {number|number}
 */
export function counter(){
  return counter.value ? ++counter.value : counter.value = 1;
}

 /**
   * Преобразует число в валюту
  */
export const currencyFormat = (value, digits) => {return new Intl.NumberFormat("ru", {style: "currency", currency: "RUB", maximumFractionDigits: digits}).format(value)};



