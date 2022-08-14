import React from 'react';
import './style.css';

function Pagination(props) {
  const page = props.currentPage;
  let totalPages = Math.ceil(props.amount / props.itemsLimit);
  let arr = [1, page - 1, page, page + 1, totalPages];

  return (
    <div className='pagination'>
      <div
        className={page === 1 ? 'currentPage' : 'firstPage page'}
        onClick={() => props.setPage(arr[0])}>
        {arr[0]}
      </div>
      {page === 1 || page === 2 || page === 3 ? '' : <div className='otherPages'>...</div>}
      {page === 1 || page === 2 ? (
        ''
      ) : (
        <div className='previousPage page' onClick={() => props.setPage(arr[1])}>
          {page - 1}
        </div>
      )}
      {page === 1 || page === arr[4] ? (
        ''
      ) : (
        <div className='currentPage' onClick={() => props.setPage(arr[2])}>
          {page}
        </div>
      )}
      {page === totalPages - 1 || page === totalPages ? (
        ''
      ) : (
        <div className='nextPage page' onClick={() => props.setPage(arr[3])}>
          {page + 1}
        </div>
      )}
      {page === totalPages - 2 || page === totalPages - 1 || page === totalPages ? (
        ''
      ) : (
        <div className='otherPages'>...</div>
      )}
      <div
        className={page === totalPages ? 'currentPage' : 'lastPage page'}
        onClick={() => props.setPage(totalPages)}>
        {totalPages}
      </div>
    </div>
  );
}

export default React.memo(Pagination);
