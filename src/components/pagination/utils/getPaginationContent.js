const getPaginationContent = (currentPage, total) => {
	const currentPageCopy = +currentPage;
	const totalCopy = +total;
	const ellipsis = '...';

	const start = [1];
	const middle = [];
	const finish = [totalCopy];

	if (total < 6) {
		const result = [];
		if (total === 0) {
			return result;
		}

		for (let i = 1; i <= total; i++){
			result.push(i);
		}
		return result;
	}

  if (currentPageCopy < 4) {
    start.push(2,3);
    if (currentPageCopy === 3) {
			start.push(4, ellipsis);
		} else {
			start.push(ellipsis);
		}
  } else if (currentPageCopy > totalCopy-3) {
		middle.push(totalCopy-2, totalCopy-1);
		if (currentPageCopy === totalCopy-2) {
			start.push(ellipsis, totalCopy-3);
		} else {
			start.push(ellipsis);
		}
	} else {
		start.push(ellipsis);
  	middle.push(currentPageCopy-1, currentPageCopy, currentPageCopy+1, ellipsis);
	}

	return [...start, ...middle, ...finish];
}

export default getPaginationContent;
