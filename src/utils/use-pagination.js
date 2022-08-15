import { useMemo } from "react";

const range = (start, end) => {
  let length = end - start + 1;
  return Array.from({ length }, (_, idx) => idx + start);
};

export const dots = '...';
const totalNumbers = 4;

export function usePagination({
  totalCount,
  limit,
  siblingCount = 1,
  currentPage
}) {
  const paginationRange = useMemo(() => {
    const totalPageCount = Math.ceil(totalCount / limit);
  
    const totalPageNumbers = siblingCount + 5;

    // Case 1
    if (totalPageNumbers >= totalPageCount) {
      return range(1, totalPageCount);
    }

    const leftSiblingIndex = Math.max(currentPage - siblingCount, 1);
    const rightSiblingIndex = Math.min(
      currentPage + siblingCount,
      totalPageCount
    );

    const leftDots = leftSiblingIndex > 2;
    const rightDots = rightSiblingIndex < totalPageCount - 1;

    const firstPageIndex = 1;
    const lastPageIndex = totalPageCount;

    // Case 2
    if (!leftDots && rightDots) {
      let leftItemCount = currentPage === 3 ?  totalNumbers : 3 * siblingCount;
      const leftRange = range(1, leftItemCount);
      return [...leftRange, dots, totalPageCount];
    }

    // Case 3
    if (leftDots && !rightDots) {
      let rightItemCount = 3 * siblingCount;

      if(currentPage === totalPageCount - 2) {
        rightItemCount = totalNumbers * siblingCount
      }

      let rightRange = range(
        totalPageCount - rightItemCount + 1,
        totalPageCount
      );

      return [firstPageIndex, dots, ...rightRange];
    }

    // Case 4
    if (leftDots && rightDots) {
      let middleRange = range(leftSiblingIndex, rightSiblingIndex);
      return [firstPageIndex, dots, ...middleRange, dots, lastPageIndex];
    }
  }, [totalCount, limit, siblingCount, currentPage]);

  return paginationRange;
}