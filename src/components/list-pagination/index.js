import React from 'react';
import {cn as bem} from "@bem-react/classname";
import './style.css';
import {createPages} from "../../utils/create-pages";
import propTypes from "prop-types";

const ListPagination = ({currentPage, totalPages, switchPage}) => {
  const cn = bem('ListPagination');
  
  // массив наполняется числами, в зависимости от общего количества товаров
  const pagesArray = []
  
  createPages(pagesArray, totalPages, currentPage)
  
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
      {currentPage < totalPages - 2 && <span className={cn('dotted')}>...</span>}
      {currentPage < totalPages - 2 &&
        <span
          className={cn('number', {active: currentPage === totalPages})}
          onClick={() => switchPage(totalPages)}>{totalPages}
        </span>}
    </div>
  );
};

ListPagination.propTypes = {
  currentPage: propTypes.number,
  totalPages: propTypes.number,
  switchPage: propTypes.func
}

ListPagination.defaultProps = {
}

export default ListPagination;
