import React, { useCallback } from 'react';
import propTypes from 'prop-types';
import {cn as bem} from "@bem-react/classname";
import './style.css';
import { config } from '../../config';
import { getRange } from './get-range';

function Pagination({
  total, 
  currentPage,
  getGoods,
  changeCurrentPage, 
}) {
  const cn = bem('Pagination');

  const range = useCallback(getRange({
    totalCount: total,
    pageSize: config.API_LIMIT,
    currentPage,
  }), [total, currentPage]);

  const callbacks = {
    changePage: useCallback((page) => {
      if (page !== currentPage && page !== '...') {
        const skip = (page - 1) * config.API_LIMIT;
        getGoods(skip);
        changeCurrentPage(page);
      }
    }, [currentPage]),
  };

  return (
    <ul className={cn()}>
      {range.map((item, idx) => {
        return (
          <li 
            key={idx} 
            className={cn('item', {
              selected: currentPage === item,
              unclickable: item === '...',
            })}
            onClick={() => callbacks.changePage(item)}
          >
            {item}
          </li>
        );
      })}
    </ul>
  );
}

Pagination.propTypes = {
  total: propTypes.number, 
  currentPage: propTypes.number.isRequired,
  getGoods: propTypes.func.isRequired,
  changeCurrentPage: propTypes.func.isRequired,
};

Pagination.defaultProps = {
  total: 0, 
};

export default React.memo(Pagination);