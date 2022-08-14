/**
 * Пагинация страниц
 * @param {Number} currentPage - номер текущей страницы
 * @param {Number} lastPage - номер последней страницы
 * @param {Number} startPage - номер начальной страницы
 * @param {Number} diff - сколько чисел показывать от текущей в разные стороны
 * @returns - массив представления страницы вида [1,'...',6,7,8,'...',15]
 */
export default function paginator(currentPage, lastPage, startPage = 1, diff = 1) {
  // Сколько страниц от основной хотим показывать в разные стороны
  let space = diff;

  // Если не больше 4-х страниц
  if (lastPage <= 4) {
    const pages = [];
    for (let i = startPage; i <= lastPage; i++) {
      pages.push(i)
    }
    return pages;
  }
  
  // Корректируем интервал страниц по по начальным позициям
  if ((startPage - currentPage === 0) || (lastPage - currentPage === 0)) {
    space = 2;
  }
  // Формируем массив доступных номеров страниц
  const pages = [startPage, currentPage, lastPage];
  for(let i = 1; i <= space; i++) {
    pages.push(currentPage - i);
    pages.push(currentPage + i);
  }   
  
  // Убираем дубли, выходящие за пределы элементы и сортируем
  const pagesNumbers = Array.from(new Set(pages))
    .filter(o => ((o >= startPage) && (o <= lastPage)))
    .sort((a,b) => a- b);

  // Добавляем разделители
  let prevItem = startPage;
  const result = [];
  pagesNumbers.forEach(item => {
    if (item - prevItem >= 2) result.push('...');
    result.push(item);
    prevItem = item;
  });
  return result;
}
