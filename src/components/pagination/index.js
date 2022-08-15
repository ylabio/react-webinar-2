import React from 'react'
import propTypes from "prop-types";
import {cn as bem} from "@bem-react/classname";
import PaginationItem from '../pagination-item';
import './style.css'

function Pagination(props) {
  const cn = bem('Pagination')
  const {activePage, totalPages} = props.pagination

  // массив всех номеров страниц от 0 до totalPages 
  let arr = Array.from(Array(totalPages).keys())
  // сюда будем складывать кусочки от общего массива с разделениями на многоточие
  let paginationItems = []

  if (totalPages < 6) {
    paginationItems = [].concat(arr.slice(0, 5))
  } else if (activePage === 1 || activePage === 2) {
    paginationItems = [].concat(arr.slice(0, 3), -1, arr.slice(-1));
  } else if (activePage === 3) {
    paginationItems = [].concat(arr.slice(0, 4), -1, arr.slice(-1));
  } else if (activePage === totalPages - 2) {
    paginationItems = [].concat(arr[0], -1, arr.slice(-4));
  } else if (activePage === totalPages - 1 || activePage === totalPages) {
    paginationItems = [].concat(arr[0], -1, arr.slice(-3))
  } else {
    paginationItems = [].concat(
      arr[0], 
      -1, 
      arr.slice(activePage - 2, activePage + 1), 
      -2, 
      arr[totalPages - 1]
    );
  }

  return (
    <div className={cn()}>
      {paginationItems && paginationItems.map((pageNum) => {
        // Номера страниц в массиве имеют уникальные положительные значения, '...' - отрицательные
        if (pageNum >= 0) {
          return (
            <PaginationItem key={pageNum} 
                            activePage={activePage} 
                            pageNum={pageNum+1} 
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