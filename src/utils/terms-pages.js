export default function pages(itemsNumber, currentPage, itemsPerPage) {
    let result;

    const AllPages = Math.ceil(itemsNumber / itemsPerPage);
    const mainValues = [currentPage - 1, currentPage, currentPage + 1];

    if (AllPages <= 5) {
        return Array.from({ length: AllPages }, (v, k) => k + 1);
    }

    if (currentPage < 3) {
        result = [1, 2, 3, 0, AllPages]
    } else if (currentPage === 3) {
        result = [1, ...mainValues, 0, AllPages];
    } else if ((AllPages - currentPage) === 1) {
        result = [1, 0, AllPages - 2, AllPages - 1, AllPages];
    } else if ((AllPages - currentPage) === 0) {
        result = [1, 0, AllPages - 1, AllPages];

    } else if ((AllPages - currentPage) === 2) {
        result = [1, 0, AllPages - 3, AllPages - 2, AllPages - 1, AllPages];
    } else {
        result = [1, 0, ...mainValues, 0, AllPages];
    }

    return result;
}

