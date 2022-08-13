const createPagination = (currentPage, totalPages) => {
  if (totalPages <= 5) {
    return Array.from({ length: totalPages }, (item, i) =>  i + 1);
  }
  if (currentPage === 1) {
    return [1, currentPage + 1, currentPage + 2, null, totalPages]
  }
  if (currentPage === 2) {
    return [1, currentPage, currentPage + 1, null, totalPages]
  }
  if (currentPage === 3) {
    return [1, currentPage - 1, currentPage, currentPage + 1, null,totalPages]
  }
  if (currentPage > 3 && currentPage < totalPages - 2) {
    return [1, null, currentPage - 1, currentPage, currentPage + 1, null, totalPages]
  }
  if (currentPage === totalPages) {
    return [1, null, currentPage - 2, currentPage - 1, totalPages]
  }
  if (currentPage === totalPages - 1) {
    return [1, null, currentPage - 1, currentPage, totalPages]
  }
  if (currentPage === totalPages - 2) {
    return [1, null, currentPage - 1, currentPage, currentPage + 1, totalPages]
  }
}

export default createPagination;