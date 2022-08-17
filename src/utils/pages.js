export const getPagesArray = (totalPages, currentPage) => {
  let pagination = [],
    i = 1;

  while (i <= totalPages) {
    if (
      i == 1 ||
      (currentPage == 1 && i <= 3) ||
      i == totalPages ||
      (i >= currentPage - 1 && i <= currentPage + 1)
    ) {
      pagination.push(i);
      i++;
    } else {
      pagination.push(0 - i);
      i = i < currentPage ? currentPage - 1 : totalPages;
    }
  }
  return pagination;
};
