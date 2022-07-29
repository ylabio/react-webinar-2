/**
 * Генерирует уникальный код на основе счётчика
 * @returns {number|number}
 */
export function counter() {
  return counter.value ? ++counter.value : counter.value = 1;
}
//Склоняет от 0 до 21
export function showNumberOfClicks(number) {
  if ([0, 1, 5, 6, 7, 8, 9].find(val => val === number)) {
    return ` | Выделено  ${number} раз`;
  }
  else if ([2, 3, 4].find(val => val === number)) {
    return ` | Выделено  ${number} раза`;
  }
  else return ` | Выделено  ${number} раз`;
}