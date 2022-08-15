import React from 'react'
import propTypes from 'prop-types';
import {cn as bem} from "@bem-react/classname";
import './style.css';
import {paginationCounter} from "../../utils/pagination-counter";

function Pagination({pagesCount, onPage, currentPage}) {
  const cn = bem('Pagination');

  const paginationRange = paginationCounter({pagesCount, currentPage});

  return (
    <div className={cn()}>
      <ul className={cn('page')}>
        {
          paginationRange.map((page, index) => {
            if (page === '...') {
              return <li className={cn('page-dots')} key={`${page}${index}`}>{page}</li>;
            }
            return (
              <li className={cn('page-number') + (currentPage === page ? '-active' : '')} 
                  key={page} 
                  onClick={() => onPage(page)}>
                {page}
              </li>
            )
          })
        }
      </ul>
    </div>
  )   
}

Pagination.propTypes = {
  pagesCount: propTypes.number.isRequired,
  onPage: propTypes.func,
  currentPage: propTypes.number.isRequired
}

Pagination.defaultProps = {
  onPage: () => {}
}

export default React.memo(Pagination);