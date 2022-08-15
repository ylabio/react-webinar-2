import propTypes from 'prop-types';
import React from 'react';
import {cn as bem} from "@bem-react/classname";
import Number from '../numbers';
import getPaginationContent from './utils/getPaginationContent';
import './style.css';

const cn = bem('Pagination');

function Pagination({page, total, setPage}){
  const contentForPagination = getPaginationContent(page, total);

  return (
    <div className={cn()}>
		  <div className={cn('container')}>
			  {contentForPagination.map((el, id) => (
				  <div key={id}>{+el ? <Number
					  className={el===+page ? 'active' : ''}
					  number={el}
					  setPage={setPage}
					  /> : <div>{el}</div>}
				  </div>)
			  )}
		  </div>
	  </div>
	)
}

Pagination.propTypes = {
	page: propTypes.oneOfType([propTypes.string, propTypes.number]),
	setPage: propTypes.func,
	total: propTypes.number
}

Pagination.defaultProps = {
	setPage: ()=>{},
	page: 1
}

export default Pagination;
