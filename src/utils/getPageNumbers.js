export const getPageNumbers = (pageCount, currentPage) => {
    const pageNumbers = [];
    const possiblePageNumbers = [0, pageCount - 1, currentPage - 1, currentPage, currentPage + 1];
    for (let i = 0; i < pageCount; i++) {
        if (possiblePageNumbers.includes(i)) {
            pageNumbers.push(i)
        }
    }
    return pageNumbers;
}