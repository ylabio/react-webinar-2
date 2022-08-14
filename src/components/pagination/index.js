import React, { useCallback } from 'react';
import {cn as bem} from "@bem-react/classname";
import useSelector from '../../utils/use-selector';
import useStore from '../../utils/use-store';
import Number from '../numbers';
import getPaginationContent from './utils/getPaginationContent';
import './style.css';

const cn = bem('Pagination');

function Pagination(){
  const store = useStore();

  const select = useSelector(state => ({
	  page: state.catalog.pagination.page,
	  total: state.catalog.pagination.total
  }));

  const contentForPagination = getPaginationContent(select.page, select.total);

  const callbacks = {
	  setPage: useCallback(e => {store.get('catalog').setPage(e.target.getAttribute('data-number'))}, []),
  };

  return (
    <div className={cn()}>
		  <div className={cn('container')}>
			  {contentForPagination.map((el, id) => (
				  <div key={id}>{+el ? <Number
					  className={el===+select.page ? 'active' : ''}
					  number={el}
					  setPage={callbacks.setPage}
					  /> : <div>{el}</div>}
				  </div>)
			  )}
		  </div>
	  </div>
	)
}

export default Pagination;
