/**
 * Возвращает массив страниц для пагинации
 * @returns {Array}
 */

export default function getPages(count, limit, currentPage) {
  const pageCount = Math.ceil(count / limit);
  let pages = Array.from({ length: pageCount }, (_, i) => i + 1);

  if (pageCount < 5 || (pageCount === 5 && currentPage === 3)) {
    return pages;
  } else {
    if (3 < currentPage && currentPage < pageCount - 2) {
      return [
        ...pages.slice(0, 1),
        '...',
        ...pages.slice(currentPage - 2, currentPage + 1),
        '...',
        pageCount,
      ];
    } else if (currentPage < 4) {
      return currentPage < 3
        ? [...pages.slice(0, 3), '...', pageCount]
        : [...pages.slice(0, 4), '...', pageCount];
    } else if (currentPage > pageCount - 3) {
      return currentPage > pageCount - 2
        ? [...pages.slice(0, 1), '...', ...pages.slice(-3)]
        : [...pages.slice(0, 1), '...', ...pages.slice(-4)];
    }
  }
}
