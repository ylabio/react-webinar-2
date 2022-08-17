import React from "react";
import propTypes from 'prop-types';
import {cn as bem} from "@bem-react/classname";
import switchPaginationRender from "../../utils/switch-pagination-render";
import './style.css';

function Pagination(props) {

  const cn = bem('Pagination');

  return (
    <div className={cn()}>
      {switchPaginationRender(props.currentPage, props.currentPage, props.lastPage, props.setPage, cn('btn'))}
    </div>
  )
}

Pagination.propTypes = {
  currentPage: propTypes.number.isRequired,
  lastPage: propTypes.number.isRequired,
  setPage: propTypes.func
}

Pagination.defaultProps = {
  setPage: () => {}
}

export default React.memo(Pagination);
