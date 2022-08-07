/**
 * Генерирует уникальный код на основе счётчика
 * @returns {number|number}
 */
export function counter(){
  return counter.value ? ++counter.value : counter.value = 1;
}
export function getPlural(i, form) {
  return form[(i % 100 > 4 && i % 100 < 20) ? 2 : [2, 0, 1, 1, 1, 2][(i % 10 < 5) ? Math.abs(i) % 10 : 5]];
}