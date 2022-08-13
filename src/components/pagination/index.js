import React from 'react';
import { cn as bem } from '@bem-react/classname';
import propTypes from 'prop-types';
import Page from '../page';
import './style.css';

function Pagination({ count, skip, limit, setSkip }) {
	const cn = bem('Pagination');

	const pageCount = Math.ceil(count / limit);
	const currentPage = skip / limit + 1;
	const lastPage = limit * (pageCount - 1);

	const arrayItems = [];

	if (currentPage === 1 || currentPage == pageCount - 2) {
		arrayItems.push(-1, 0, 1, 2);
	} else if (currentPage === 3 || currentPage == pageCount) {
		arrayItems.push(-2, -1, 0, 1);
	} else {
		arrayItems.push(-1, 0, 1);
	}

	const pageArray = arrayItems
		.map((item) => currentPage + item)
		.filter((page) => page > 0 && page <= pageCount);

	return (
		<div className={cn()}>
			{!pageArray.includes(1) && (
				<>
					<Page
						isActive={currentPage === 1}
						onClick={() => {
							setSkip(0);
						}}
					>
						1
					</Page>
					<div className={cn('dots')}>...</div>
				</>
			)}
			{pageArray.map((page) => {
				return (
					<Page
						key={page}
						isActive={page === currentPage}
						onClick={() => {
							setSkip(limit * (page - 1));
						}}
					>
						{page}
					</Page>
				);
			})}
			{!pageArray.includes(pageCount) && (
				<>
					<div className={cn('dots')}>...</div>
					<Page
						isActive={currentPage === pageCount}
						onClick={() => {
							setSkip(lastPage);
						}}
					>
						{pageCount}
					</Page>
				</>
			)}
		</div>
	);
}

Pagination.propTypes = {
	count: propTypes.number.isRequired,
	skip: propTypes.number.isRequired,
	limit: propTypes.number.isRequired,
	setSkip: propTypes.func.isRequired,
};

Pagination.defaultProps = {
	setSkip: () => {},
};

export default React.memo(Pagination);
