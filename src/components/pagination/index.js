import React from 'react'
import propTypes from "prop-types";
import {cn as bem} from "@bem-react/classname";
import PaginationItem from '../pagination-item';
import './style.css'

function Pagination(props) {
  const cn = bem('Pagination')

  return (
    <div className={cn()}>
      {props.visiblePages && props.visiblePages.map((pageNum) => {
        // Номера страниц в массиве имеют уникальные положительные значения, '...' - отрицательные
        if (pageNum >= 0) {
          return (
            <PaginationItem key={pageNum} 
                            activePage={props.activePage} 
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
  activePage: propTypes.number.isRequired,
  visiblePages: propTypes.arrayOf(propTypes.number),
  loadPage: propTypes.func,
}

Pagination.defaultProps = {
  loadPage: () => {}
}

