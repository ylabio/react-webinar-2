/**
 * Генерирует уникальный код на основе счётчика
 * @returns {number|number}
 */
export function counter(){
  return counter.value ? ++counter.value : counter.value = 1;
}

// Возвращает вариант слова 'раз' в зависимости от числа
export function counterWord(count) {
  let word;
  let arr = ('' + count).split('').map(Number);
  (arr[arr.length - 1] > 1 && arr[arr.length - 1] < 5 && arr[arr.length - 2] !== 1) ? word = 'раза' : word = 'раз';
  return word;
}
