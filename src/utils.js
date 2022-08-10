/**
 * Генерирует уникальный код на основе счётчика
 * @returns {number|number}
 */
export function counter(){
  return counter.value ? ++counter.value : counter.value = 1;
}

/**
 * Форматирует число в правильный вид написания курса рубля
 * @returns {number}
 */
export function formatNumber(num){
  return num.toLocaleString('ru-RU')
}
