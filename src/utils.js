/**
 * Генерирует уникальный код на основе счётчика
 * @returns {number|number}
 */
export function counter(){
  return counter.value ? ++counter.value : counter.value = 1;
}

export function format(qty) {
  return qty == 2 || qty == 3 || qty == 4 ? qty + ' раза' : qty  + ' раз';
}


