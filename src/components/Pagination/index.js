import React, {useCallback} from 'react';
import propTypes from 'prop-types';
import {cn as bem} from "@bem-react/classname";
import './styles.css';

function Pagination({pageNumber, curentPage, paginate}) {
  const cn = bem('Pagination');

  if(curentPage === 1 &&  pageNumber < 2){
    return null;
  }

  let pages = [];
  if(curentPage === 1 || curentPage > 2){
    pages.push(1);
  }
  if(curentPage <= 3 && curentPage !== 1){
    pages.push(curentPage - 1);
    pages.push(curentPage);
  }
  if(curentPage > 3){
    pages.push('...');
    pages.push(curentPage - 1);
    pages.push(curentPage);
  }
  if(pageNumber - curentPage > 1){
    pages.push(curentPage + 1);
    pages.push('...');
    pages.push(pageNumber); 
  }
  if(pageNumber - curentPage === 1){
    pages.push(curentPage + 1);
  }

  return (
    <div className={cn()}>
      {pages.map((page, index) =>
        (page !== '...') ?
          <div className={cn('item', {curent: page === curentPage})} onClick={() => paginate(page)} key={index}>{page}</div>:
          <div className={cn('item')} key={index}>{page}</div>
      )}
    </div>
  )
}

Pagination.propTypes = {
  pageNumber: propTypes.number,
  curentPage: propTypes.number,
  paginate: propTypes.func
}

export default React.memo(Pagination);
