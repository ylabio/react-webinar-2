/**
 * Генерирует уникальный код на основе счётчика
 * @returns {number|number}
 */
export function counter(){
  return counter.value ? ++counter.value : counter.value = 1;
}
export function Format(text) {
  return text == 2 || text == 3 || text == 4 ? text + ' раза' : 
    text + ' раз';
}
