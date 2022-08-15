import React, { useCallback, useMemo } from 'react';
import { cn as bem } from '@bem-react/classname';
import './style.css';

function Pagination({ totalPages, currPage, onSelectPage }) {
	const cn = bem('Pagination');

	const utils = {
		_createDots: useCallback(
			() => <span className={cn('dots')}>{` ... `}</span>,
			[],
		),
		displayLeftDots: useCallback((currPage, totalPages) => {
			if (currPage > 3) return utils._createDots();
			return;
		}, []),
		displayRightDots: useCallback((currPage, totalPages) => {
			if (totalPages - currPage > 2) return utils._createDots();
			return;
		}, []),
	};

	const ClickHandler = useCallback(
		(event) => {
			const page = event.target.textContent;
			if (page == currPage) return;
			onSelectPage(page - 1);
		},
		[currPage],
	);

	const rangeOfPages = useMemo(() => {
		const range = Array(totalPages)
			.fill(null)
			.map((_, i) => i + 1)
			.slice(1, -1);

		switch (currPage) {
			case 1:
				return range.slice(0, currPage + 1);
			case 2:
				return range.slice(0, currPage);
			case totalPages:
				return range.slice(currPage - 4, totalPages);
			default:
				return range.slice(currPage - 3, currPage);
		}
	}, [totalPages, currPage]);

	return (
		<ul className={cn()}>
			<li
				className={cn('item', { active: currPage === 1 })}
				onClick={ClickHandler}
			>
				{1}
			</li>
			{utils.displayLeftDots(currPage, totalPages)}
			{rangeOfPages.map((page) => (
				<li
					key={page}
					className={cn('item', { active: currPage === page })}
					onClick={ClickHandler}
				>
					{page}
				</li>
			))}
			{utils.displayRightDots(currPage, totalPages)}
			{totalPages !== 1 && (
				<li
					className={cn('item', { active: currPage === totalPages })}
					onClick={ClickHandler}
				>
					{totalPages}
				</li>
			)}
		</ul>
	);
}

export default React.memo(Pagination);
