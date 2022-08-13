import React, { useCallback } from 'react';
import propTypes from 'prop-types';
import {cn as bem} from "@bem-react/classname";
import createButtonsPagination from '../../utils/create-buttons-pagination';
import './styles.css';

function Pagination(props) {
	const cn = bem('Pagination');
	const pages = Array.from(Array(props.pagesCount), (_,i) => i + 1);
	const buttonsPagination = props.pagesCount && createButtonsPagination(pages, props.currPage);

	const callbacks = {
    setCurrPage: useCallback((page) => props.setCurrPage(page), [props.currPage])
  };

	return (
		<div className={cn()}>
			{buttonsPagination.length ? 
				buttonsPagination.map((page, index) => 
					<button 
						className={`${props.currPage === page ? 'Pagination-item_active' : page === '...' ? 'Pagination-item_noactive' : cn('item')}`} 
						key={`page-item_${index}`}
						disabled={page === '...' ? true : false}
						onClick={() => callbacks.setCurrPage(page)}
					>
						{page}
					</button>
				) : 
				''
			}
		</div>
	)
}

Pagination.propTypes = {
  pagesCount: propTypes.number.isRequired,
	currPage: propTypes.number.isRequired,
	setCurrPage: propTypes.func.isRequired
}

Pagination.defaultProps = {
	
}

export default React.memo(Pagination);