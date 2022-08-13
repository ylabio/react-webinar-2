/**
 * Создание массива в зависимости от количества страниц
 * @param countPages
 * @returns {array}
 */

export default function getPaginationArray(countPages) {
  const pagesArray = []
  for (let i = 0; i < countPages; i++) {
    pagesArray.push(i + 1);
  }
  return pagesArray;
}