import React, { useCallback, useEffect, useState } from 'react';
import propTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import './style.css';

function Pagination(props) {
  const cn = bem('Pagination');
  const [pages, setPages] = useState([]);

  console.log('Pagination');

  useEffect(() => {
    const pageCount = Math.ceil(props.count / props.limit);
    let pagesArr = Array.from({ length: pageCount }, (_, i) => i + 1);
    let pages;

    if (pageCount <= 5 ) {
      pages = pagesArr;
    } else {
      if (3 < props.currentPage && props.currentPage < pageCount - 2) {  
        pages = [...pagesArr.slice(0,1), '...', ...pagesArr.slice(props.currentPage - 2, props.currentPage + 1 ),'...', pageCount]
      } else if (props.currentPage < 4) {
        pages = props.currentPage < 3
        ? [...pagesArr.slice(0,3), '...', pageCount]
        : [...pagesArr.slice(0,4), '...', pageCount]
      } else if (props.currentPage > pageCount - 3) {
        pages = props.currentPage > pageCount - 2
        ? [...pagesArr.slice(0,1), '...', ...pagesArr.slice(-3)]
        : [...pagesArr.slice(0,1), '...', ...pagesArr.slice(-4)]    
      }
    }
    setPages(pages);
  }, [props.count, props.limit, props.currentPage]); 

  const callbacks = {
    skipDots: useCallback(
      e => {
        const target =
          e.target.textContent === '...'
            ? props.currentPage
            : +e.target.textContent;     
        if (!(target === props.currentPage)) {
          props.setCurrentPage(target);
        }
      },
      [props.setCurrentPage, props.currentPage]
    ),
  };

  return (
    <ul className={cn()}>
      {pages.map((item, index) => (
        <li
          key={index}
          className={cn(
            item === props.currentPage
              ? 'page_current'
              : item === '...'
              ? 'page_dots'
              : 'page'
          )}
          onClick={callbacks.skipDots}
        >
          {item}
        </li>
      ))}
    </ul>
  );
}

Pagination.propTypes = {
  setCurrentPage: propTypes.func.isRequired,
  count: propTypes.number.isRequired,
  limit: propTypes.number.isRequired,
  currentPage: propTypes.number.isRequired,
};

export default React.memo(Pagination);
