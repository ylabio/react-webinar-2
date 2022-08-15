import React, {useMemo} from 'react';
import './style.css';
import {cn as bem} from "@bem-react/classname";
import propTypes from "prop-types";

function Paginator({totalItemsCount, pageSize, currentPage, onPageChanged}) {

  const cn = bem('Paginator');

  const dots = '...';

  const pagPages = useMemo(() => {
    let pagesCount = Math.ceil(totalItemsCount / pageSize);

    let pages = [];
    for (let i = 1; i <= pagesCount; i++) {
      pages.push(i);
    }
    if (pages.length < 5 || pages.length === 5 && currentPage === 3) return pages;
    if ([1, 2].includes(currentPage)) return [1, 2, 3, dots, pagesCount];
    if (currentPage === 3) return [1, 2, 3, 4, dots, pagesCount]
    if ([pagesCount - 1, pagesCount].includes(currentPage)) return [1, dots, pagesCount - 2, pagesCount - 1, pagesCount]
    if (currentPage === pagesCount - 2) return [1, dots, pagesCount - 3, pagesCount - 2, pagesCount - 1, pagesCount]
    return [1, dots, currentPage - 1, currentPage, currentPage + 1, dots, pagesCount]
  }, [currentPage, totalItemsCount])

  return (
    <div className={cn()}>
      {pagPages.map((p, index) =>
        p === dots || p === currentPage
          ? <div className={cn('page', {selected: currentPage === p, dots: dots === p})}
                 key={index}>{p}</div>
          : <div
            className={cn('page', {unselected: currentPage !== p})}
            key={index}
            onClick={() => {
              onPageChanged(p);
            }}>{p}</div>
      )}
    </div>
  )
}

Paginator.propTypes = {
  totalItemsCount: propTypes.number,
  pageSize: propTypes.number,
  currentPage: propTypes.number,
  onPageChanged: propTypes.func
}

Paginator.defaultProps = {
  totalItemsCount: 0,
  pageSize: 3,
  currentPage: 1,
  onPageChanged: () => {
  }
}

export default React.memo(Paginator);