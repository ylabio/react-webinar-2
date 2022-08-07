/**
 * Генерирует уникальный код на основе счётчика
 * @returns {number|number}
 */
export function counter(){
  return counter.value ? ++counter.value : counter.value = 1;
}

/**
 * Генерирует уникальный код на основе счётчика
 * @returns {number|number}
 */
 export function cartCounter(){
  return cartCounter.value ? ++cartCounter.value : cartCounter.value = 1;
}
