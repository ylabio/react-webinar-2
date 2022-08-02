/**
 * Генерирует уникальный код на основе счётчика
 * @returns {number|number}
 */
export function counter() {
  return counter.value ? ++counter.value : (counter.value = 1);
}

/**
 * Проверяет счетчик выделения записи для корректного вывода окончания слова `раз`
 * @param {number} selectedCount
 * @returns {string|number}
 */
export function checkSelectedCount(selectedCount) {
  if (isNaN(selectedCount) || !isFinite(selectedCount)) {
    return NaN;
  }
  if (selectedCount % 100 > 10 && selectedCount % 100 < 20) {
    return "раз";
  }
  switch (selectedCount % 10) {
    case 2:
    case 3:
    case 4:
      return "раза";
    default:
      return "раз";
  }
}
