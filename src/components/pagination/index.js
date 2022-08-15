import React from 'react';
import { cn as bem } from '@bem-react/classname';
import { getPagesArray } from '../../utils/get-pages';
import './style.css';
import { filterArray, mapArray } from '../../utils/handle-pagination';
import propTypes from 'prop-types';

function Pagination({ totalPages, changePage, currentPage, limit }) {
  const cn = bem('Page');

  let pagesArray = getPagesArray(totalPages);

  return (
    <div className={cn()}>
      {pagesArray
        .filter((page) => {
          return filterArray(page, pagesArray, currentPage, true, false);
        })
        .map((page) => {
          const listPage = page * limit - limit;
          const pageDigit = (
            <span
              className={
                currentPage === page
                  ? cn('number', { active: true })
                  : cn('number')
              }
              key={page}
              onClick={() => changePage(listPage)}>
              {page}
            </span>
          );
          const dots = (
            <span key={page} className={cn('dots')}>
              ...
            </span>
          );
          return mapArray(page, pagesArray, currentPage, pageDigit, dots);
        })}
    </div>
  );
}

Pagination.propTypes = {
  totalPages: propTypes.number.isRequired,
  limit: propTypes.number.isRequired,
  currentPage: propTypes.number.isRequired,
  changePage: propTypes.func,
};

Pagination.defaultProps = {
  changePage: () => {},
};

export default React.memo(Pagination);
