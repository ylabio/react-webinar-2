import React from 'react';
import './style.css';
import {cn as bem} from "@bem-react/classname";

function Pagination({currentPage, amount, itemsLimit, setPage}) {
  const page = currentPage;
  let totalPages = Math.ceil(amount / itemsLimit);
  let arr = [1, page - 1, page, page + 1, totalPages];
  const cn = bem('Pagination');

  return (
    <div className={cn()}>
      <div
        className={page === 1 ? cn('currentPage') : 'Pagination-firstPage Pagination-page'}
        onClick={() => setPage(arr[0])}>
        {arr[0]}
      </div>
      {page === 1 || page === 2 || page === 3 ? '' : <div className={cn('otherPages')}>...</div>}
      {page === 1 || page === 2 ? (
        ''
      ) : (
        <div className='Pagination-previousPage Pagination-page' onClick={() => setPage(arr[1])}>
          {page - 1}
        </div>
      )}
      {page === 1 || page === arr[4] ? (
        ''
      ) : (
        <div className={cn('currentPage')} onClick={() => setPage(arr[2])}>
          {page}
        </div>
      )}
      {page === totalPages - 1 || page === totalPages ? (
        ''
      ) : (
        <div className='Pagination-nextPage Pagination-page' onClick={() => setPage(arr[3])}>
          {page + 1}
        </div>
      )}
      {page === totalPages - 2 || page === totalPages - 1 || page === totalPages ? (
        ''
      ) : (
        <div className={cn('otherPages')}>...</div>
      )}
      <div
        className={page === totalPages ? cn('currentPage') : cn('lastPage page')}
        onClick={() => setPage(totalPages)}>
        {totalPages}
      </div>
    </div>
  );
}

export default React.memo(Pagination);