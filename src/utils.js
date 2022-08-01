const plural = require('plural-ru');

/**
 * Генерирует уникальный код на основе счётчика
 * @returns {number|number}
 */
export function counter() {
  return counter.value ? ++counter.value : (counter.value = 1);
}

export function wordEnding(int) {
  return plural(int, '%d раз', '%d раза', '%d раз');
}
