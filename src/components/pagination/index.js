import {cn as bem} from "@bem-react/classname";
import propTypes from "prop-types";
import React from "react";
import usePagination from "src/utils/use-pagination";

import './style.css'

function Pagination({count, contentPerPage, currentPage, setCurrentPage}) {
  const cn = bem('Pagination');

  const {
    totalPages,
    page,
    setPage,
    gaps,
  } = usePagination(contentPerPage, count, currentPage);
  const {after, before, paginationGroup} = gaps;

  const onPageClick = (numberPage) => {
    setPage(numberPage);
    setCurrentPage(numberPage)
  };

  return (
    <div className={cn()}>
      <span className={cn('button', {active: page === 1})}
            onClick={page !== 1 ? () => onPageClick(1) : null}>{1}</span>
      {before ? <span className={cn('dot')}>...</span> : null}

      {paginationGroup.map(item => {
        return <span key={item} className={cn('button', {active: page === item})}
                     onClick={page !== item ? () => onPageClick(item) : null}>{item}</span>
      })}

      {after ? <span className={cn('dot')}>...</span> : null}
      <span className={cn('button', {active: page === totalPages})}
            onClick={page !== totalPages ? () => onPageClick(totalPages) : null}>{totalPages}</span>
    </div>
  )
}

Pagination.propTypes = {
  count: propTypes.number.isRequired, // Обяхательное свойство - функция
  contentPerPage: propTypes.number,
  setCurrentPage: propTypes.func.isRequired,
  currentPage: propTypes.number,
}

Pagination.defaultProps = {
  contentPerPage: 10,// Значение по умолчанию
  currentPage: 1,
}

export default React.memo(Pagination);
