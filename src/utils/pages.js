export default function pages(itemsNumber, currentPage, itemsPerPage){
  let result;

  const numberOfPages = Math.ceil(itemsNumber / itemsPerPage);
  const mainValues = [currentPage - 1, currentPage, currentPage + 1];

  if (numberOfPages <= 5) {
    return Array.from({length: numberOfPages}, (v, k) => k + 1);
  }

  if (currentPage < 3) {
    result = [1, 2, 3, 0, numberOfPages];
  } else if (currentPage === 3) {
    result = [1, ...mainValues, 0, numberOfPages];
  } else if ((numberOfPages - currentPage) < 2) {
    result = [1, 0, numberOfPages - 2, numberOfPages - 1, numberOfPages];
  } else if ((numberOfPages - currentPage) === 2) {
    result = [1, 0, numberOfPages - 3, numberOfPages - 2, numberOfPages - 1, numberOfPages];
  } else {
    result = [1, 0, ...mainValues, 0, numberOfPages];
  }

  return result;
}
