import React from 'react';
import './style.css';
import { cn as bem } from "@bem-react/classname";
import propTypes from "prop-types";

function Pagination({ currentPage, pages, setPage }) {
  const cn = bem('Pagination');

  function isVisibleItemPagination(page) {
    return page === 1
      || (currentPage === 1 && page === 3)
      || (currentPage === pages[pages.length - 1] && page === pages[pages.length - 3])
      || (page <= currentPage + 1 && page >= currentPage - 1) || page === pages[pages.length - 1];
  }

  function isVisibleDots(page) {
    return page === currentPage + 2
      || page === currentPage - 2
      || (currentPage === 1 && page === 4)
      || (currentPage === pages[pages.length - 1] && page === pages[pages.length - 4])
  }

  return (
    <div className={cn()}>
      {pages.map(page => {
        if (isVisibleItemPagination(page)) {
          return <div key={page} className={cn('item', { 'current': currentPage === page })} onClick={() => setPage(page)}>{page}</div>
        } else if (isVisibleDots(page)) {
          return <div key={page} className={cn('dots')}>...</div>
        }
        return null;
      })}
    </div>
  )
}

Pagination.propTypes = {
  currentPage: propTypes.number.isRequired,
  pages: propTypes.array,
  setPage: propTypes.func
}

Pagination.defaultProps = {
  pages: [],
  setPage: () => { }
}

export default React.memo(Pagination);
