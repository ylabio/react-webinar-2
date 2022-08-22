import React, { useCallback } from 'react';
import {cn as bem} from "@bem-react/classname";
import propTypes from 'prop-types';
import ItemPagination from "../item-pagination";
import './style.css';

function Pagination({ selected, limit, count, onClick }) {
  const cn = bem('Pagination');

  const pageCount = Math.ceil(count / limit);

  const getRange = (start, end) => Array(end - start + 1).fill().map((v, i) => i + start);

  const pagination = (currentPage, pagesCount) => {
    let delta;
    if (pagesCount <= 7) {
      delta = 7;
    } else {
      delta = currentPage === 3 || currentPage === (pagesCount - 2) ? 3 : 2
    }
    const range = {
      start: Math.round(currentPage - delta / 2),
      end: Math.round(currentPage + delta / 2)
    }

    if (range.start - 1 === 1 || range.end + 1 === pagesCount) {
      range.start += 1;
      range.end += 1;
    }

    let pages = currentPage > delta
      ? getRange(Math.min(range.start, pagesCount - delta), Math.min(range.end, pagesCount))
      : getRange(1, Math.min(pagesCount, delta + 1));
    
    const withDots = (value, pair) => (pages.length + 1 !== pagesCount ? pair : [value]);

    if (pages[0] !== 1) pages = withDots(1, [1, '...']).concat(pages)
    
    if (pages[pages.length - 1] < pagesCount) {
      pages = pages.concat(withDots(pagesCount, ['...', pagesCount]))
    }

    return pages;
  }

  const pages = pagination(selected, pageCount)

  return (
    <ul className={cn()}>
      {count ? 
        pages.map((page, i) => {
          if (page === '...') {
            return <span 
              className={cn('ellipsis')}
              key={`${i}-${page}`}
            >
              {page}
            </span>
          }
          
          return <ItemPagination key={`${i}-${page}`} limit={limit} selected={selected} page={page} onClick={onClick}/>
        }
        ) :
        null
      }
    </ul>
  );
};

Pagination.propTypes = {
  selected: propTypes.number.isRequired,
  count: propTypes.number.isRequired,
  onClick: propTypes.func.isRequired
}

Pagination.defaultProps = {
}

export default React.memo(Pagination);
