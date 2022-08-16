const currentRange = (first, last) => {
  let length = last - first + 1;
  return Array.from({length}, (_, index) => index + first);
};

export const paginationCounter = (pagesCount, currentPage) => {
  const paginationRange = () => {
    if (5 >= pagesCount) {
      return currentRange(1, pagesCount);
    }

    const prevPage = currentPage - 1;
    const nextPage = currentPage + 1;
    const leftPortion = prevPage > 2;
    const rightPortion = nextPage < pagesCount - 1;

    if (!leftPortion && rightPortion) {
      let paginateLength = 3;
      let paginate;
      if (currentPage > 2){
        paginate = currentRange(1, paginateLength + 1);
      }
      else{
        paginate = currentRange(1, paginateLength);
      }
      return [...paginate, '...', pagesCount];
    }

    if (leftPortion && !rightPortion) {
      let paginateLength = 3;
      let paginate;
      if (currentPage < (pagesCount - 1)){
        paginate = currentRange(pagesCount - paginateLength, pagesCount);
      }
      else{
        paginate = currentRange(pagesCount - paginateLength + 1, pagesCount);
      }
      return [1, '...', ...paginate];
    }

    if (leftPortion && rightPortion) {
      let paginate = currentRange(prevPage, nextPage);
      return [1, '...', ...paginate, '...', pagesCount];
    }
  };

  return paginationRange;
};

