export const filterArray = (
  page,
  pagesArray,
  currentPage,
  option1,
  option2
) => {
  if (currentPage === 1 && page <= currentPage + 3) {
    return option1;
  } else if (page === pagesArray.length || page === pagesArray[0]) {
    return option1;
  } else if (
    (page <= currentPage + 2 && page >= currentPage - 2) ||
    page === currentPage
  ) {
    return option1;
  } else {
    return option2;
  }
};

export const mapArray = (page, pagesArray, currentPage, option1, option2) => {
  if (currentPage === 1 && page <= currentPage + 2) {
    return option1;
  } else if (page === pagesArray.length || page === pagesArray[0]) {
    return option1;
  } else if (
    page === currentPage + 1 ||
    page === currentPage - 1 ||
    page === currentPage
  ) {
    return option1;
  } else {
    return option2;
  }
};
