import React, { useCallback } from 'react';
import propTypes from 'prop-types';
import {cn as bem} from "@bem-react/classname";
import './style.css';
import { config } from '../../config';
import { getRange } from './get-range';

function Pagination({
  total, 
  currentPage,
  changePage,
}) {
  const cn = bem('Pagination');

  const range = useCallback(getRange({
    totalCount: total,
    pageSize: config.API_LIMIT,
    currentPage,
  }), [total, currentPage]);

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
            onClick={() => changePage(item)}
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
  changePage: propTypes.func.isRequired,
};

Pagination.defaultProps = {
  total: 0, 
};

export default React.memo(Pagination);