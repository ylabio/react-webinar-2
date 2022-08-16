import React from 'react';
import { cn as bem } from '@bem-react/classname';
import propTypes from 'prop-types';
import Page from '../page';
import './style.css';

function Pagination({ limit, pageCount, currentPage, setSkip, navigate }) {
	const cn = bem('Pagination');

	const arrayItems = [];

	if (currentPage === 1 || currentPage === pageCount - 2) {
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
							navigate({ pathname: 'page/1' });
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
							navigate({ pathname: `page/${page}` });
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
							setSkip(limit * (pageCount - 1));
							navigate({ pathname: `page/${pageCount}` });
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
	limit: propTypes.number.isRequired,
	pageCount: propTypes.number.isRequired,
	currentPage: propTypes.number.isRequired,
	setSkip: propTypes.func.isRequired,
	navigate: propTypes.func.isRequired,
};

Pagination.defaultProps = {
	setSkip: () => {},
	navigate: () => {},
};

export default React.memo(Pagination);
