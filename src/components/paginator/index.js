import React from 'react';
import propTypes from 'prop-types';
import {cn as bem} from '@bem-react/classname';
import './style.css';
import usePagination, {DOTS} from '../../utils/use-pagination';

function Paginator(props) {
  const cn = bem('Paginator');

  const paginationRange = usePagination(
    props.totalItems,
    10,
    props.currentPage
  );

  return (
    <ul className={cn()}>
      {paginationRange.map(pageNumber => {
        if (pageNumber === DOTS) {
          return <li key={Math.random(pageNumber)}>&#8230;</li>;
        }

        return (
          <li
            key={pageNumber}
            className={cn('item', {selected: pageNumber === props.currentPage})}
            onClick={() => props.onPageClick(pageNumber)}
          >
            {pageNumber}
          </li>
        );
      })}
    </ul>
  );
}

Paginator.propTypes = {
  currentPage: propTypes.number,
  totalItems: propTypes.number,
  onPageClick: propTypes.func
};

export default React.memo(Paginator);
