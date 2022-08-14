/**
 * Форматирование разрядов числа
 * @param value
 * @param options
 * @returns {string}
 */
export default function createButtonsPagination(pages, currPage) {
	let newPages = [];

	if(pages.length <= 4) {
		newPages = [...pages];
	}

	if(pages.length === 5) {
		if(currPage === 2) {
			newPages = [...pages.slice(0, currPage + 1), '...', pages.length];
		} else if(currPage === 3) {
			newPages = [...pages];
		} else if(currPage === 4) {
			newPages = [1, '...', ...pages.slice(currPage - 2, currPage + 1)];
		} else if(currPage === 5) {
			newPages = [1, '...', ...pages.slice(currPage - 3, currPage + 1)];
		} else {
			newPages = [...pages.slice(0, currPage + 2), '...', pages.length];
		}
	}

	if(pages.length >= 6) {
		if(currPage >= 1 && currPage <= 3) {
			if(currPage === 2 || currPage === 3) {
				newPages = [...pages.slice(0, currPage + 1), '...', pages.length];
			} else {
				newPages = [...pages.slice(0, currPage + 2), '...', pages.length];
			}
		} else if(currPage >= pages.length - 2 && currPage <= pages.length) {
			if(currPage === pages.length - 3 || currPage === pages.length - 2) {
				newPages = [1, '...', ...pages.slice(currPage - 2, currPage + 2)];
			} else if(currPage === pages.length) {
				newPages = [1, '...', ...pages.slice(currPage - 3, currPage + 1)];
			} else {
				newPages = [1, '...', ...pages.slice(currPage - 2, currPage + 1)];
			}
		} else {
			newPages = [1, '...', ...pages.slice(currPage - 2, currPage + 1), '...', pages.length];
		}
	}

	return newPages;
}
