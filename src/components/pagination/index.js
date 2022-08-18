import React from 'react';
import propTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import './styles.css';

const Pagination = ({ currentPage, amountPages, setCurrentPage }) => {
  const cn = bem('Pagination');

  let pageArr = [];
  if (currentPage === 1) {
    pageArr = [1, 2, 3];
  } else if (currentPage === amountPages) {
    pageArr = [amountPages - 2, amountPages - 1, amountPages];
  } else {
    pageArr = [currentPage - 1, currentPage, currentPage + 1];
  }

  return (
    <>
      <div className={cn()}>
        {!pageArr.includes(1) && (
          <>
            <span onClick={(e) => setCurrentPage(+e.target.innerText)} className={cn('item')}>
              {1}
            </span>
            {currentPage !== 3 ? <div className={cn('dots')}> ... </div> : ''}
          </>
        )}
        {pageArr.map((page) => (
          <span
            key={page}
            onClick={(e) => setCurrentPage(+e.target.innerText)}
            className={
              cn('item') + (page === currentPage ? ` ${cn('item', { active: true })}` : '')
            }
          >
            {page}
          </span>
        ))}
        {!pageArr.includes(amountPages) && (
          <>
            {currentPage !== amountPages - 2 ? <div className={cn('dots')}> ... </div> : ''}
            <span onClick={(e) => setCurrentPage(+e.target.innerText)} className={cn('item')}>
              {amountPages}
            </span>
          </>
        )}
      </div>
    </>
  );
};

Pagination.propTypes = {
  currentPage: propTypes.number,
  totalPages: propTypes.number,
  setCurrentPages: propTypes.func,
};

Pagination.defaultProps = {
  currentPage: 1,
  totalPages: 10,
  setCurrentPages: () => {},
};

export default React.memo(Pagination);
