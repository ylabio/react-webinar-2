import React from 'react';

const DOTS = '...';

export function usePagination({
  totalCount,
  pageSize,
  currentPage
}) {
  const totalPages = Math.ceil(totalCount / pageSize);
  const range = []

  for (let i = 0; i < 3; i++) {
    if (currentPage >= 3 && currentPage <= 11) {
      range.push(currentPage + i - 1);
    }
  }

  if (!range.includes(1)) range.unshift(1);
  if (!range.includes(totalPages)) range.push(totalPages);

  if (currentPage > 3 && currentPage < 11) {
    range.splice(1, 0, DOTS);
    range.splice(range.length - 1, 0, DOTS);
  }

  if (currentPage === 3) {
    range.splice(range.length - 1, 0, DOTS);
  } 

  if (currentPage >= 1 && currentPage < 3) {
    range.splice(range.length - 1, 0, DOTS);

    if (currentPage === 1) {
      range.splice(1, 0, currentPage + 1);
      range.splice(2, 0, currentPage + 2);
     
    }

    if (currentPage === 2) {
      range.splice(1, 0, currentPage);  
      range.splice(2, 0, currentPage + 1);  
    }
  }

  if (currentPage === 11) {
    range.splice(1, 0, DOTS);
  } 

  if (currentPage > 11 && currentPage <= 13) {
    if (currentPage === 13) {
      range.splice(range.length - 1, 0, currentPage - 1);
      range.splice(range.length - 2, 0, currentPage - 2);
    }

    if (currentPage === 12) {
      range.splice(1, 0, currentPage);  
      range.splice(2, 0, currentPage + 1);  
    }

    range.splice(1, 0, DOTS);
  }
  
  return range;
};