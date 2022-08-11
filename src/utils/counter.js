/**
 * Генерирует уникальный код на основе счётчика
 * @returns {number|number}
 */
export default function counter(){
  return counter.value ? ++counter.value : counter.value = 1;
}
