import item from "../components/item"

const createPagination = (currentPage, totalPages) => {
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