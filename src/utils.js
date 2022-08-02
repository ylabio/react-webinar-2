/**
 * Генерирует уникальный код на основе счётчика
 * @returns {number|number}
 */
export function counter(){
  return counter.value ? ++counter.value : counter.value = 1;
}

 /**
   * Функция подбора склонений
   * @param number Целое число для которого выполняется склонение
   * @param array Массив возможных окончаний
   * @param cases Случаи при которых выбирается необходимый индекс из массива
   * @return {string} подходящий вариант из массива txt для переданого числа number
   */
  export const declination = (number, txt, cases = [2, 0, 1, 1, 1, 2]) => 
  txt[(number % 100 > 4 && number % 100 < 20) ? 2 : cases[(number % 10 < 5) ? number % 10 : 5]];