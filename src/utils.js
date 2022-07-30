/**
 * Генерирует уникальный код на основе счётчика
 * @returns {number|number}
 */
export function counter() {
  return counter.value ? ++counter.value : (counter.value = 1);
}

/**
 * добавляет окончание для корректного отображения множественного числа в слове раз(-а)
 * @param countString {string} количество совершенных выделений элемента приведенная к строке
 * @returns {string|string}
 */
const formatEnding = (countString) =>
  countString.at(-1).match(/(2|3|4)/g) && !countString.slice(-2).match(/(12|13|14)/g) ? "раза" : "раз";

/**
 * Выводит текст с количеством совершенных выделений
 * @param item {object} Объект элемента
 * @returns {string|string}
 */
export const countSelected = (item) =>
  item.count ? ` | Выделялось ${item.count} ${formatEnding(item.count.toString())}` : "";
