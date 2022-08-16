/**
 * Расчет количества страниц
 * @param value
 */
export default function pagesNumber(value, itemsToDisplay){
  return Array.from(
    Array(Math.ceil(value / itemsToDisplay)),
    (_, index) => index + 1
  );
}
