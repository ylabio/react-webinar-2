import React from 'react'
import propTypes from "prop-types";
import {cn as bem} from "@bem-react/classname";
import PaginationItem from '../pagination-item';
import './style.css'

function Pagination(props) {
  const cn = bem('Pagination')
  const {activePage, totalPages} = props.pagination

  // сюда будем складывать номера страниц для отображения
  // отрицательные значения соответствуют '...'
  const paginationItems = []

  if (totalPages < 6) {
    paginationItems.push(1,2,3,4)
  } else if (activePage === 1 || activePage === 2) {
    paginationItems.push(1,2,3,-1,totalPages);
  } else if (activePage === 3) {
    paginationItems.push(1,2,3,4,-1,totalPages);
  } else if (activePage === totalPages - 2) {
    paginationItems.push(1,-1,totalPages - 3,totalPages - 2,totalPages - 1,totalPages - 2);
  } else if (activePage === totalPages - 1 || activePage === totalPages) {
    paginationItems.push(1,-1,totalPages - 2,totalPages - 1,totalPages)
  } else {
    paginationItems.push(1,-1,activePage - 1,activePage,activePage + 1,-2,totalPages)
  }

  return (
    <div className={cn()}>
      {paginationItems.map((pageNum) => {
        // Номера страниц в массиве имеют уникальные положительные значения, '...' - отрицательные
        if (pageNum > 0) {
          return (
            <PaginationItem key={pageNum} 
                            activePage={activePage} 
                            pageNum={pageNum} 
                            loadPage={props.loadPage} 
            />
          )
        } else {
          return <span key={pageNum} className={cn('dots')}>...</span>
        }
      })}
    </div>
  )
}

export default React.memo(Pagination)

Pagination.propTypes = {
  pagination: propTypes.object.isRequired,
  loadPage: propTypes.func,
}

Pagination.defaultProps = {
  loadPage: () => {}
}