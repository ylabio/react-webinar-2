/**
 * Генерирует уникальный код на основе счётчика
 * @returns {number|number}
 */
export function counter(){
  return counter.value ? ++counter.value : counter.value = 1;
}


/**
 * Возвращает слово 'раз' в нужном падеже в зависимости от принимаемого числа
 * @returns {string}
 */
export function getAmountCase(num) {
  const num1 = num % 100;
  const num2 = num % 10;

  if (num1 > 10 && num1 < 20) {
    return 'раз';
  }

  if (num2 > 1 && num2 < 5) {
    return 'раза';
  }

  return 'раз';
}
