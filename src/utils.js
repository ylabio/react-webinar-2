/**
 * Генерирует уникальный код на основе счётчика
 * @returns {number|number}
 */
export const counter = () => {
  return counter.value ? ++counter.value : (counter.value = 1);
};
