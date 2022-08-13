import React,  {useCallback} from 'react';
import propTypes from 'prop-types';
import {cn as bem} from "@bem-react/classname";
import './style.css';
import createPagination from '../../utils/createPagination';

function Pagination(props) {
  const cn = bem('Pagination');

  const limitPerPage = props.limitPerPage;
  const totalPages = Math.ceil(props.totalPages / limitPerPage);
  const currentPage = props.currentPage;
  
  // создания массива для рендера пагинации
  const paginationArray = createPagination(currentPage, totalPages)

  const callbacks = {
    onChangePage: useCallback(
      (numberPage) => props.changeNumberPage(numberPage), [props.changeNumberPage])
  };

  return(
    <ul className={cn()}>
      {paginationArray.map((numberPage, index) => (
        <li key={index} className={cn('item', {active: numberPage === props.currentPage, dots: !numberPage})} 
        onClick={!numberPage || numberPage === props.currentPage ? () => {} : () => callbacks.onChangePage(numberPage)}>
          {numberPage ? numberPage : '...'}</li>
      ))}
    </ul>
  )
}

Pagination.propTypes = {
  currentPage: propTypes.number.isRequired,
  totalPages: propTypes.number.isRequired,
  limitPerPage: propTypes.number.isRequired,
  changeNumberPage: propTypes.func.isRequired,
}

export default React.memo(Pagination);