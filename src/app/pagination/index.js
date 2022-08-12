import React from 'react';
import propTypes, { func } from 'prop-types';
import {cn as bem} from "@bem-react/classname";
import './style.css';
import useSelector from "../../utils/use-selector";
import { config } from '../../config';
import { usePagination } from './usePagination';
import useStore from '../../utils/use-store';

function Pagination() {
  const {total, currentPage} = useSelector(state => {
    return state.catalog;
  });
  const cn = bem('Pagination');
  const store = useStore();

  const range = usePagination({
    totalCount: total,
    pageSize: config.API_LIMIT,
    currentPage,
  });

  function changePage(page) {
    if (page !== currentPage && page !== '...') {
      const skip = (page - 1) * config.API_LIMIT;
      store.get('catalog').getGoods(skip);
      store.get('catalog').changeCurrentPage(page);
    }
  }

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

export default Pagination;