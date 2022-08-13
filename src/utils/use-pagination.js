import {useMemo} from 'react';

const range = (start, end) => {
  let length = end - start + 1;
  return Array.from({ length }, (_, index) => index + start);
};

export const usePagination = ({
  count,
  activePage
}) => {
  const paginationRange = useMemo(() => {
    /*
    1 случай:
    Если количество страниц 5 или меньше 
    */
    if (5 >= count) {
      return range(1, count);
    }

    const leftSiblingIndex = activePage - 1;
    const rightSiblingIndex = activePage + 1;
    const shouldShowLeftDots = leftSiblingIndex > 2;
    const shouldShowRightDots = rightSiblingIndex < count - 1;
    
    /*
      2 случай:
      Если слева нет многоточия, но справа есть
    */
    if (!shouldShowLeftDots && shouldShowRightDots) {
      let leftItemCount = 1 + 2 * 1;
      let leftRange;
      if (activePage > 2){
        leftRange = range(1, leftItemCount + 1);
      }
      else{
        leftRange = range(1, leftItemCount);
      }
      return [...leftRange, '...', count];
    }

    /*
      3 случай:
      Нет справа многоточия, но есть слева
    */
    if (shouldShowLeftDots && !shouldShowRightDots) {
      let rightItemCount = 1 + 2 * 1;
      let rightRange;
      if (activePage < (count - 1)){
        rightRange = range(count - rightItemCount, count);
      }
      else{
        rightRange = range(count - rightItemCount + 1, count);
      }
      return [1, '...', ...rightRange];
    }

    /*
      4 случай:
      Многоточия с двух сторон
    */
    if (shouldShowLeftDots && shouldShowRightDots) {
      let middleRange = range(leftSiblingIndex, rightSiblingIndex);
      return [1, '...', ...middleRange, '...', count];
    }
  }, [count, activePage]);

  return paginationRange;
};