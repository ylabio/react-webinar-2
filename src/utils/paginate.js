/**
 * Возвращает массив страниц для пагинации на основе count, limit и текущей страницы
 * @returns {Array}
 */
export default function paginate(count, limit, currentPage) {
  const pageCount = Math.ceil(count / limit);

  if (pageCount < 5 || (pageCount === 5 && currentPage === 3)) {
    return Array.from({ length: pageCount }, (_, i) => i + 1);

  } else {

    if (3 < currentPage && currentPage < pageCount - 2) {
      return [1, '...', currentPage - 1, currentPage, currentPage + 1, '...', pageCount];

    } else if (currentPage < 4) {
      return currentPage < 3
        ? [1, 2, 3, '...', pageCount]
        : [1, 2, 3, 4, '...', pageCount];

    } else if (currentPage > pageCount - 3) {
      return currentPage > pageCount - 2
        ? [1, '...', pageCount - 2, pageCount - 1, pageCount]
        : [1, '...', pageCount - 3, pageCount - 2, pageCount - 1, pageCount];
    }
  }
}