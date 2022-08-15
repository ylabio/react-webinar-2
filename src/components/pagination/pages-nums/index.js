import React from "react";
import {cn as bem} from "@bem-react/classname";
import propTypes from 'prop-types';

function PageNums(props) {
  const cn = bem('Pagination');

  return (
    <li
      className={
        `${cn('item')} ${props.pageNumber === props.currentPage ?
          'Pagination-item_active' : ''}`
      }
      onClick={() => props.onPageChange(props.pageNumber)}
    >
      {props.pageNumber}
    </li>
  )
}

PageNums.propTypes = {
  pageNumber: propTypes.number,
  currentPage: propTypes.number,
  onPageChange: propTypes.func,
}


export default React.memo(PageNums);