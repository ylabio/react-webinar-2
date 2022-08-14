export default function getPagesArray(page, totalPages) {
  let result = [];
  
  if (totalPages <= 7) {
    for (let i = 1; i <= totalPages; i++) {
      result.push(i);
    }
  } else if (page >= 1 && page <= 2) {
    result.push(1, 2, 3, "...", totalPages);
  } else if (page >= totalPages -1 && page <= totalPages) {
    result.push(1, "...", totalPages - 2, totalPages - 1, totalPages);
  } else if (page === 3) {
    result.push(1, 2, 3, 4, "...", totalPages);
  } else if (page === totalPages - 2) {
    result.push(1, "...", totalPages - 3,  totalPages - 2, totalPages - 1, totalPages);
  } else {
    result.push(1, "...", page - 1, page, page + 1, "...", totalPages);
  }

  return result;
};