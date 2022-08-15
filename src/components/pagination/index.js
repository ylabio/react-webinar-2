import React, { useCallback, useLayoutEffect, useState } from 'react';
import propTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import './style.css';

function Pagination(props) {
  const cn = bem('Pagination');
  const [pages, setPages] = useState([]);

  console.log('Pagination');

  useLayoutEffect(() => {
    const pageCount = Math.ceil(props.count / props.limit);
    let pages;

    if (pageCount < 5 || (pageCount === 5 && props.currentPage === 3)) {
      pages = Array.from({ length: pageCount }, (_, i) => i + 1);

    } else {

      if (3 < props.currentPage && props.currentPage < pageCount - 2) {
        pages = [1, '...', props.currentPage - 1, props.currentPage, props.currentPage + 1, '...', pageCount];

      } else if (props.currentPage < 4) {
        pages = props.currentPage < 3
          ? [1, 2, 3, '...', pageCount]
          : [1, 2, 3, 4, '...', pageCount];

      } else if (props.currentPage > pageCount - 3) {
        pages = props.currentPage > pageCount - 2
          ? [1, '...', pageCount - 2, pageCount - 1, pageCount]
          : [1, '...', pageCount - 3, pageCount - 2, pageCount - 1, pageCount];
      }
    }
    setPages(pages);
  }, [props.count, props.limit, props.currentPage]);

  const callbacks = {
    setCurrentPage: useCallback((e) => {
      const target = e.target.innerText === '...' ? props.currentPage : +e.target.innerText;
      if (!(target === props.currentPage)) {
        props.setCurrentPage(target);
      }
    }, [props.setCurrentPage, props.currentPage])
  };

  return (
    <ul className={cn()}>
      {pages.map((item, index) =>
        <li
          key={index}
          className={cn(item === props.currentPage ? 'item_current' : item === '...' ? 'item_dots' : 'item')}
          onClick={callbacks.setCurrentPage}
        >
          {item}
        </li>
      )}
    </ul>
  );
}

Pagination.propTypes = {
  setCurrentPage: propTypes.func.isRequired,
  count: propTypes.number.isRequired,
  limit: propTypes.number.isRequired,
  currentPage: propTypes.number.isRequired
};

export default React.memo(Pagination);

