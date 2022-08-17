/**
 * Переход по страницам по номеру страниц
 * @param {number} pageCount
 * @param {number} currentPage
 * @returns {array}
 */
const paginationPages = (pageCount, currentPage) => {
  const separator = '...';
  let pages = [];
  for (let i = 1; i <= pageCount; i++) {
    pages.push(i);
  }

  if (pages.length <= 5 && currentPage === 3) {
    return pages;
  }
  if (currentPage === 1 || (currentPage === 2 && pages.length > 3)) {
    return [1, 2, 3, separator, pageCount];
  }
  if (currentPage === 3) {
    return [1, 2, 3, 4, separator, pageCount];
  }
  if (currentPage === pageCount - 2) {
    return [
      1,
      separator,
      currentPage - 1,
      currentPage,
      currentPage + 1,
      pageCount,
    ];
  }
  if (currentPage === pageCount || currentPage === pageCount - 1) {
    return [1, separator, pageCount - 2, pageCount - 1, pageCount];
  }

  return [
    1,
    separator,
    currentPage - 1,
    currentPage,
    currentPage + 1,
    separator,
    pageCount,
  ];
};

export default paginationPages;
