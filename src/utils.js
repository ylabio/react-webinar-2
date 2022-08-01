/**
 * Генерирует уникальный код на основе счётчика
 * @returns {number|number}
 */
export function counter(){
  return counter.value ? ++counter.value : counter.value = 1;
}

export function getPlural (num) {
  const word =
    (num % 100 === 12 || num % 100 === 13 || num % 100 === 14)
      ? 'раз'
      : (num % 10 === 2 || num % 10 === 3 || num % 10 === 4)
        ? 'раза'
        : 'раз';
  return num + ' ' + word;
}
