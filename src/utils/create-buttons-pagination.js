/**
 * Форматирование разрядов числа
 * @param value
 * @param options
 * @returns {string}
 */
export default function createButtonsPagination(currPage, pagesCount) {
	const pages = Array.from(Array(pagesCount), (_,i) => i + 1);
	let buttonsPagination = [];

	if(pages.length <= 4) {
		buttonsPagination = [...pages];
	}

	if(pages.length === 5) {
		if(currPage === 2) {
			buttonsPagination = [...pages.slice(0, currPage + 1), '...', pages.length];
		} else if(currPage === 3) {
			buttonsPagination = [...pages];
		} else if(currPage === 4) {
			buttonsPagination = [1, '...', ...pages.slice(currPage - 2, currPage + 1)];
		} else if(currPage === 5) {
			buttonsPagination = [1, '...', ...pages.slice(currPage - 3, currPage + 1)];
		} else {
			buttonsPagination = [...pages.slice(0, currPage + 2), '...', pages.length];
		}
	}

	if(pages.length >= 6) {
		if(currPage >= 1 && currPage <= 3) {
			if(currPage === 2 || currPage === 3) {
				buttonsPagination = [...pages.slice(0, currPage + 1), '...', pages.length];
			} else {
				buttonsPagination = [...pages.slice(0, currPage + 2), '...', pages.length];
			}
		} else if(currPage >= pages.length - 2 && currPage <= pages.length) {
			if(currPage === pages.length - 3 || currPage === pages.length - 2) {
				buttonsPagination = [1, '...', ...pages.slice(currPage - 2, currPage + 2)];
			} else if(currPage === pages.length) {
				buttonsPagination = [1, '...', ...pages.slice(currPage - 3, currPage + 1)];
			} else {
				buttonsPagination = [1, '...', ...pages.slice(currPage - 2, currPage + 1)];
			}
		} else {
			buttonsPagination = [1, '...', ...pages.slice(currPage - 2, currPage + 1), '...', pages.length];
		}
	}

	return buttonsPagination;
}
