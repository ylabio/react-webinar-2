/**
 * Генерирует уникальный код на основе счётчика
 * @returns {number|number}
 */
export function counter(){
  return counter.value ? ++counter.value : counter.value = 1;
}

export function divideNumberByPieces(x, delimiter) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, delimiter || " ");
}
