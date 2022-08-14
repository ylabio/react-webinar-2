import React from 'react';
import './style.css'
import {cn as bem} from "@bem-react/classname";
import {createPages} from "../../utils/createPages";

const ListPagination = ({currentPage, totalItems, switchPage}) => {
  const cn = bem('ListPagination');
  
  const pagesArray = []
  
  createPages(pagesArray, totalItems, currentPage)

  return (
    <div className={cn()}>
        <span
          className={currentPage === 1 ? cn('number', {active: true}) : cn('number')}
          onClick={() => switchPage(1)}>1
        </span>
      {currentPage > 3 && <span>...</span>}
      {pagesArray.map((page, index) =>
        <span key={page + index}
              className={currentPage === page ? cn('number', {active: true}) : cn('number')}
              onClick={() => switchPage(page)}>
          {page}
        </span>)}
      {currentPage < 11 && <span>...</span>}
      {currentPage < 11 && <span
        className={currentPage === totalItems ? cn('number', {active: true}) : cn('number')}
        onClick={() => switchPage(Math.ceil(totalItems / 10))}>{Math.ceil(totalItems / 10)}
        </span>}
    </div>
  );
};

export default ListPagination;
