/**
 * Генерирует уникальный код на основе счётчика
 * @returns {number|number}
 */
export function counter(){
  return counter.value ? ++counter.value : counter.value = 1;
}

export function pluralize(count) {
  if (((count % 100) > 10) && ((count % 100) < 20)) {
    return('раз');
  } else if (((count % 10) > 1) && ((count % 10)) < 5) {
    return('раза');
  } else {
    return('раз');
  }
}