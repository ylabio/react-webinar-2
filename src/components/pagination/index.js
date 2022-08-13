import React from 'react';
import propTypes from 'prop-types';
import './style.css';
import {cn as bem} from "@bem-react/classname";

function Pagination({totalNumberOfPage, currentPage, onSelect}) {
	const cn = bem('Pagination');

  console.log(totalNumberOfPage);

	const NumberPage = () => {
		const pages = [];
		const startOfSplit = Math.max(currentPage - 1, 1);
		const endOfSplit = Math.min(startOfSplit + 2, totalNumberOfPage);
		
		if (startOfSplit > 1) {
      pages.push(1);
      if (startOfSplit > 2) pages.push(null);
		}

    for (let i = startOfSplit; i <= endOfSplit; i++) {
      pages.push(i);
    }

    if (endOfSplit < totalNumberOfPage) {
      if (endOfSplit < totalNumberOfPage - 1) pages.push(null);
      pages.push(totalNumberOfPage);
    }

		return pages.map((num, index) => (
        <li 
          key={index} 
          className={cn('item') + ` ${currentPage === num ? cn('item_active') : ''}` + ` ${!num ? cn('item_split') : ''}`}
          onClick={num ? () => onSelect(num) : () => {}}>
          {num || '...'}
        </li>
      )
		)
	}

	return(
		<ul className={cn()}>
			<NumberPage/>
		</ul>
	)
}

Pagination.propTypes = {
  totalNumberOfPage: propTypes.number.isRequired,
  currentPage: propTypes.number.isRequired,
  onSelect: propTypes.func.isRequired
}

export default React.memo(Pagination);