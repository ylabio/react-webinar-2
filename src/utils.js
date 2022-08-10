/**
 * Генерирует уникальный код на основе счётчика
 * @returns {number|number}
 */
export function counter() {
  return counter.value ? ++counter.value : (counter.value = 1);
}

export default function numberFormat(value, options = {}) {
  return new Intl.NumberFormat("ru-RU", options).format(value);
}
