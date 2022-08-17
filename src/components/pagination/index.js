import React from 'react';
import './style.css';
import {cn as bem} from "@bem-react/classname";

function Pagination({currentPage, setPage, totalPages}) {
  let arr = [1, currentPage - 1, currentPage, currentPage + 1, totalPages];
  const cn = bem('Pagination');

  return (
    <div className={cn()}>
      <div
        className={currentPage === 1 ? cn('currentPage') : 'Pagination-firstPage Pagination-page'}
        onClick={() => setPage(arr[0])}>
        {arr[0]}
      </div>
      {currentPage === 1 || currentPage === 2 || currentPage === 3 ? '' : <div className={cn('otherPages')}>...</div>}
      {currentPage === 1 || currentPage === 2 ? (
        ''
      ) : (
        <div className='Pagination-previousPage Pagination-page' onClick={() => setPage(arr[1])}>
          {currentPage - 1}
        </div>
      )}
      {currentPage === 1 || currentPage === arr[4] ? (
        ''
      ) : (
        <div className={cn('currentPage')} onClick={() => setPage(arr[2])}>
          {currentPage}
        </div>
      )}
      {currentPage === totalPages - 1 || currentPage === totalPages ? (
        ''
      ) : (
        <div className='Pagination-nextPage Pagination-page' onClick={() => setPage(arr[3])}>
          {currentPage + 1}
        </div>
      )}
      {currentPage === totalPages - 2 || currentPage === totalPages - 1 || currentPage === totalPages ? (
        ''
      ) : (
        <div className={cn('otherPages')}>...</div>
      )}
      <div
        className={currentPage === totalPages ? cn('currentPage') : cn('lastPage page')}
        onClick={() => setPage(totalPages)}>
        {totalPages}
      </div>
    </div>
  );
}

export default React.memo(Pagination);