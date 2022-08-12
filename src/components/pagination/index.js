import {cn as bem} from "@bem-react/classname";
import propTypes from "prop-types";
import React from "react";
import usePagination from "src/utils/use-pagination";

import './style.css'

function Pagination({count, contentPerPage, onPage}) {
  const cn = bem('Pagination');

  const {totalPages, page, setPage, gaps,} = usePagination(contentPerPage, count);
  const {after, before, paginationGroup} = gaps;

  const onPageClick = (numberPage) => {
    setPage(numberPage);
    onPage(numberPage * contentPerPage - contentPerPage);
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
  onPage: propTypes.func.isRequired
}

Pagination.defaultProps = {
  contentPerPage: 10// Значение по умолчанию
}

export default React.memo(Pagination);
