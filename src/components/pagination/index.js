import React, { useCallback, useEffect, useState } from 'react';
import { cn as bem } from '@bem-react/classname';
import { DELIMETER, ITEMS_ON_PAGE, PAGINATION_RANGE } from '../../utils/render-data';
import Delimeter from './delimeter';
import Page from './page';
import './style.css';

function Pagination({ items, count, loadCatalog }) {
  const cn = bem('Pagination');
  const [activePage, setActivePage] = useState(1);
  const [pagesToShow, setPagesToShow] = useState([]);

  function countSkip() {
    return (activePage - 1) * ITEMS_ON_PAGE;
  }

  const callbacks = {
    countSkip: useCallback(() => countSkip(), [activePage]),
    setActivePage: useCallback((page) => setActivePage(page), []),
  };

  useEffect(() => {
    loadCatalog(callbacks.countSkip());
  }, [activePage]);

  useEffect(() => {
    setPagesToShow(createPages());
  }, [activePage, count, items]);

  function createPages() {
    const firstPage = 1;
    const lastPage =
      count % ITEMS_ON_PAGE ? Math.ceil(count / ITEMS_ON_PAGE) : count / ITEMS_ON_PAGE;
    const halfRange = Math.floor(PAGINATION_RANGE / 2);
    const pages = [];

    if (activePage === firstPage) {
      for (let i = firstPage; i < firstPage + PAGINATION_RANGE; i++) {
        if (i <= lastPage) {
          pages.push(i);
        }
      }
      if (pages.includes(lastPage)) {
        return pages;
      } else if (lastPage === firstPage + PAGINATION_RANGE) {
        pages.push(lastPage);
        return pages;
      } else {
        pages.push(DELIMETER, lastPage);
        return pages;
      }
    } else if (activePage === lastPage) {
      for (let i = lastPage - PAGINATION_RANGE + 1; i <= lastPage; i++) {
        if (i >= firstPage) {
          pages.push(i);
        }
      }
      if (pages.includes(firstPage)) {
        return pages;
      } else if (firstPage === lastPage - PAGINATION_RANGE) {
        pages.unshift(firstPage);
        return pages;
      } else {
        pages.unshift(firstPage, DELIMETER);
        return pages;
      }
    } else {
      for (let i = activePage - halfRange; i <= activePage + halfRange; i++) {
        if (i >= firstPage && i <= lastPage) {
          pages.push(i);
        }
      }

      if (activePage - (halfRange + 1) === firstPage && !pages.includes(firstPage)) {
        pages.unshift(firstPage);
      } else if (!pages.includes(firstPage)) {
        pages.unshift(firstPage, DELIMETER);
      }
      if (activePage + (halfRange + 1) === lastPage && !pages.includes(lastPage)) {
        pages.push(lastPage);
      } else if (!pages.includes(lastPage)) {
        pages.push(DELIMETER, lastPage);
      }
    }
    return pages;
  }

  function showPages() {
    return pagesToShow.map((page, index) => {
      if (page !== DELIMETER) {
        return (
          <Page
            number={page}
            activePage={activePage}
            setActivePage={callbacks.setActivePage}
            key={page}
          />
        );
      }
      return <Delimeter key={page + index} />;
    });
  }

  return <div className={cn()}>{showPages()}</div>;
}

export default React.memo(Pagination);
