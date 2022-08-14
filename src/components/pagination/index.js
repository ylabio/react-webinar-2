import React, { useCallback } from 'react';
import propTypes from 'prop-types';
import {cn as bem} from "@bem-react/classname";
import './style.css';
import createRange from "../../utils/createRange";

function Pagination({count, skip, setSkip}) {
	skip = skip + 1;
	const cn = bem('Pagination');
	const range = createRange(count, skip)

	return (
		<ul className={cn()}>
			{range.map((item, i) => {
				return (
					<li key={i} className={cn('item', {current: skip === item, ellipsis: item === '...'})} onClick={() => setSkip(item)}>
						{item}
					</li>
				);
			})}
		</ul>
	);
}

Pagination.propTypes = {
	/*total: propTypes.number,
	currentPage: propTypes.number.isRequired,
	changePage: propTypes.func.isRequired,
	limit: propTypes.number.isRequired,*/
};

Pagination.defaultProps = {
	total: 0,
};

export default Pagination;