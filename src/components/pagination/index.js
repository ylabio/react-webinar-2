import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { cn as bem } from '@bem-react/classname';
import propTypes from 'prop-types';
import Page from '../page';
import './style.css';

function Pagination({ pageCount, limit, setSkip, pageIndexNo }) {
	const cn = bem('Pagination');

	const navigate = useNavigate();

	const lastPage = limit * (pageCount - 1);

	const arrayItems = [];

	if (pageIndexNo === 1 || pageIndexNo == pageCount - 2) {
		arrayItems.push(-1, 0, 1, 2);
	} else if (pageIndexNo === 3 || pageIndexNo == pageCount) {
		arrayItems.push(-2, -1, 0, 1);
	} else {
		arrayItems.push(-1, 0, 1);
	}

	const pageArray = arrayItems
		.map((item) => pageIndexNo + item)
		.filter((page) => page > 0 && page <= pageCount);

	return (
		<div className={cn()}>
			{!pageArray.includes(1) && (
				<>
					<Page
						isActive={pageIndexNo === 1}
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
						isActive={page === pageIndexNo}
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
						isActive={pageIndexNo === pageCount}
						onClick={() => {
							setSkip(lastPage);
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
	pageCount: propTypes.number.isRequired,
	limit: propTypes.number.isRequired,
	setSkip: propTypes.func.isRequired,
	pageIndexNo: propTypes.number.isRequired,
};

Pagination.defaultProps = {
	setSkip: () => {},
};

export default React.memo(Pagination);
