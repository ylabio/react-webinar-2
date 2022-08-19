import React, {useState, useEffect} from "react";

/**
 * Хук пагинации
 * @param contentPerPage
 * @param count
 * @param currentPage
 * @return
 */

const usePagination = (contentPerPage, count, currentPage=1) => {
  const [page, setPage] = useState(currentPage);
  const [gaps, setGaps] = useState({
    before: false,
    paginationGroup: [],
    after: false,
  });
  const [pagesInBetween, setPagesInBetween] = useState([]);

  const totalPages = Math.ceil(count / contentPerPage);

// если больше 2 страниц заполнение масива цифрами кроме первой страницы и последней
  useEffect(() => {
    if (totalPages > 2) {
      const temp = new Array(totalPages - 2).fill(1).map((_, i) => i + 2);
      setPagesInBetween(temp);
    }
  }, [totalPages]);

  useEffect(() => {
    let paginationGroup = pagesInBetween;
    let before = false;
    let after = false;

    // выборка нужных страниц центрального масива если больше 4 елементов
    if (totalPages > 4) {
      switch (page) {
        case(1):
        case(2):
          paginationGroup = pagesInBetween.slice(0, 2);
          break
        case(totalPages):
        case(totalPages - 1):
          paginationGroup = pagesInBetween.slice(-2, totalPages);
          break
        default:
          paginationGroup = [page - 1, page, page + 1];
      }
    }

    // нужны или нет точки до и после центра пагинации
    if (totalPages === 5) {
      if (paginationGroup[0] > 2) {
        before = true;
      }
      if (paginationGroup[0] < totalPages - 2) {
        after = true;
      }
    }

    if (totalPages > 5) {
      if (paginationGroup[0] > 2) {
        before = true;
      }
      if (paginationGroup[0] < totalPages - 3) {
        after = true;
      }
    }

    setGaps({paginationGroup, before, after});
  }, [page, pagesInBetween, totalPages]);

  return {
    totalPages,
    setPage,
    page,
    gaps,
  };
};

export default usePagination;

