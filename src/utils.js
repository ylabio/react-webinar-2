/**
 * Генерирует уникальный код на основе счётчика
 * @returns {number|number}
 */
export function counter(){
  return counter.value ? ++counter.value : counter.value = 1;
}

/**
 * Переводит число N в строку 'N ₽'
 * @param number {number} Цена в рублях 7955320
 * @returns {string} 7 955 320 ₽
 */
export function toRubPrice(number){
  return `${number.toLocaleString('ru')} ₽`;
}