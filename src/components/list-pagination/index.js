import React from 'react';
import {cn as bem} from "@bem-react/classname";
import './style.css';
import {createPages} from "../../utils/create-pages";

const ListPagination = ({currentPage, totalItems, switchPage}) => {
  const cn = bem('ListPagination');
  // массив наполняется числами, в зависимости от общего количества товаров
  const pagesArray = []
  
  createPages(pagesArray, totalItems, currentPage)
  
  // высчитывается общее количество страниц при выводе по 10 товаров на странице
  const pagesCount = Math.ceil(totalItems / 10)
  
  return (
    <div className={cn()}>
        <span
          className={currentPage === 1 ? cn('number', {active: true}) : cn('number')}
          onClick={() => switchPage(1)}>1
        </span>
      {currentPage > 3 && <span className={cn('dotted')}>...</span>}
      {pagesArray.map((page, index) =>
        <span key={page + index}
              className={cn('number', {active: currentPage === page})}
              onClick={() => switchPage(page)}>
          {page}
        </span>)}
      {currentPage < pagesCount - 2 && <span className={cn('dotted')}>...</span>}
      {currentPage < pagesCount - 2 &&
        <span
          className={cn('number', {active: currentPage === pagesCount})}
          onClick={() => switchPage(pagesCount)}>{pagesCount}
        </span>}
    </div>
  );
};

export default ListPagination;
