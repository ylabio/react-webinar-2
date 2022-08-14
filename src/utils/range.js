/**
 * Возвращает массив с заданными номерами страниц
 * @param {number} start
 * @param {number} end
 * @returns Array
 */

export default function range(start, end) {
  let length = end - start + 1;

  return Array.from({length}, (_, idx) => idx + start);
}
