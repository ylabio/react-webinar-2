/**
 * Генерирует уникальный код на основе счётчика
 * @returns {number|number}
 */
export function counter(){
  return counter.value ? ++counter.value : counter.value = 1;
}

/**
 * Увеличивает свойство numberClick объекта элемента на 1.
 * @param item - элемент, который был нажат
 */
export const countClicks = (item) =>
    item.numbersClick ? item.numbersClick++ : (item.numbersClick = 1);

/**
 * Возвращает правильное окончание числа
 * @param number - номер для проверки
 * @param one - текст, который будет возвращен, если число равно 1
 * @param two - текст, используемый, когда число заканчивается на 2, 3 или 4
 * @param five - окончание для чисел от 5 до 20
 */
export const setTextWithEnding = (number, one, two, five) => {
  let n = Math.abs(number);
  n %= 100;
  if (n >= 5 && n <= 20) {
    return five;
  }
  n %= 10;
  if (n === 1) {
    return one;
  }
  if (n >= 2 && n <= 4) {
    return two;
  }
  return five;
};