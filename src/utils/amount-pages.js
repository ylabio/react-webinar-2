/**
 * Получение количества страниц для пагинации
 * @param totalItem
 * @param limit
 * @returns {number}
 */

export default function getAmountOfPage(totalItem, limit) {
  return Math.ceil(totalItem / limit);
}