/**
 * Принимает номер текущей страницы и общее кол-во страниц
 * Возвращает массив из чисел (номера страниц) и '...' для пагинации
 * Возвращаются первая, последняя и соседние с текущей страницы
 * Скрытые страницы заменяются символом '...'
 * 
 * @returns {array}
 */
export default function getPages(pageNumber, amount) {
  let flag = 0;
  let pages = [];
  for (let i = 1; i <= amount; i++) {
    if (i === 1 || i === amount || i === pageNumber - 1 || i === pageNumber || i === pageNumber + 1) {
      pages.push(i);
      flag = 0;
    } else {
      if (flag === 0) {
        pages.push('...');
        flag = 1;
      }
    }
  };
  return pages;
}
