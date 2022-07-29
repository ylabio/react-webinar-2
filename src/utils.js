/**
 * Генерирует уникальный код на основе счётчика
 * @returns {number|number}
 */
export function counter() {
  return counter.value ? ++counter.value : (counter.value = 1);
}

export function wordEnding(int) {
  // превращаем входное число в строку и разбиваем строку на массив.

  let intToArray = String(int).split('');

  // получаем последний элемент массива

  let lastChar = intToArray[intToArray.length - 1];

  // получаем предпоследний элемент массива

  let preLastChar = intToArray[intToArray.length - 2];

  // делаем проверки
  // для 0

  if (lastChar == 0) return `${int} раз`;

  // для чисел, у которых последний знак будет от 5 до 9 включительно

  if (lastChar >= 5 && lastChar <= 9) return `${int} раз`;

  // для чисел 11, 12, 13, 14

  if (preLastChar == 1 && lastChar >= 1 && lastChar <= 4) return `${int} раз`;

  // для чисел 1, 21, 31, 41 и т.д.

  if (preLastChar != 1 && lastChar == 1) return `${int} раз`;

  // для чисел 2, 3, 4, 122, 323, 724 и т.д.

  if (preLastChar != 1 && lastChar >= 2 && lastChar <= 4) return `${int} раза`;
}
