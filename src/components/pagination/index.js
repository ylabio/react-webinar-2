import React from 'react';
import propTypes from 'prop-types';
import {cn as bem} from "@bem-react/classname";
import './style.css';

function Pagination({count, currentPage, load, changePage}) {
  const cn = bem('Pagination');

  const limit = 5;

  const pages = [];

  for (let i = 1; i <= Math.ceil(count/limit); i++) {
    pages.push(i);
  }

  function toShow () {
    const pagesToShow = []

    for (let i = 0; i < pages.length; i++){
      if (pages[i] === pages[0] && currentPage === pages[i]) {
        pagesToShow.push(pages[i], pages[i + 1], pages[i + 2], 0);
        break;
      }
      if (pages[i] === pages[1] && currentPage === pages[i]) {
        pagesToShow.push(pages[i - 1], pages[i], pages[i + 1], 0);
        break;
      }
      if (pages[i] === pages[2] && currentPage === pages[i]) {
        pagesToShow.push(pages[i - 2], pages[i - 1], pages[i], pages[i + 1], 0);
        break;
      }
      if (pages[i] === pages[pages.length - 2] && currentPage === pages[i]) {
        pagesToShow.push(pages[0], 0, pages[i - 1], pages[i]);
        break;
      }
      if (pages[i] === pages[pages.length - 3] && currentPage === pages[i]) {
        pagesToShow.push(pages[0], 0, pages[i - 1], pages[i], pages[i + 1]);
        break;
      }
      if (pages[i] === pages[pages.length - 1] && currentPage === pages[i]) {
        pagesToShow.push(pages[0], 0, pages[i - 2], pages[i - 1]);
      } else if (currentPage === pages[i]) {
        pagesToShow.push(pages[0], 0, pages[i - 1], pages[i], pages[i + 1], 0);
      }
    }

    pagesToShow.push(pages[pages.length - 1]);

    return pagesToShow;
    }

  React.useEffect(() => {
    load(limit, limit * (currentPage - 1));
  }, [currentPage, count]);

  return (
      <div className={cn()}>
      {toShow().map((i, index) => {
        if (i) {
          if (i === currentPage) {
            return (
              <span
                className={cn('active') + ' ' + cn('item')}
                key={index}
                onClick={() => changePage(i)}
              >
                {i}
              </span>
            );
          }
          return (
            <span
              className={cn('item')}
              key={index}
              onClick={() => changePage(i)}
            >
              {i}
            </span>
          );
        } else {
          return (
            <span className={cn('item')} key={index}>
              ...
            </span>
          );
        }
      })}
    </div>
  )
}

Pagination.propTypes = {
}


Pagination.defaultProps = {
}

export default React.memo(Pagination);