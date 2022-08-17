import { useMemo } from "react";

const range = (start, end) => {
  let length = end - start + 1;
  return Array.from({ length }, (_, idx) => idx + start);
};

export const DOTS = '...';
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

    const shouldShowLeftDOTS = leftSiblingIndex > 2;
    const shouldShowRightDOTS = rightSiblingIndex < totalPageCount - 1;

    const firstPageIndex = 1;
    const lastPageIndex = totalPageCount;

    // Case 2
    if (!shouldShowLeftDOTS && shouldShowRightDOTS) {
      let leftItemCount = currentPage === 3 ?  totalNumbers : 3 * siblingCount;
      const leftRange = range(1, leftItemCount);
      return [...leftRange, DOTS, totalPageCount];
    }

    // Case 3
    if (shouldShowLeftDOTS && !shouldShowRightDOTS) {
      let rightItemCount = 3 * siblingCount;

      if(currentPage === totalPageCount - 2) {
        rightItemCount = totalNumbers * siblingCount
      }

      let rightRange = range(
        totalPageCount - rightItemCount + 1,
        totalPageCount
      );

      return [firstPageIndex, DOTS, ...rightRange];
    }

    // Case 4
    if (shouldShowLeftDOTS && shouldShowRightDOTS) {
      let middleRange = range(leftSiblingIndex, rightSiblingIndex);
      return [firstPageIndex, DOTS, ...middleRange, DOTS, lastPageIndex];
    }
  }, [totalCount, limit, siblingCount, currentPage]);

  return paginationRange;
}
