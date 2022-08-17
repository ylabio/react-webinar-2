import React, { useCallback } from 'react';
import "./style.css"
import { cn as bem } from "@bem-react/classname";
import { Link, } from "react-router-dom";
import propTypes from 'prop-types';

function PaginationItem({ value, state, changePage }) {
  const cn = bem('Pagination');
  const callbacks = {
    changePage: useCallback((e) => changePage(value), [changePage, value]),
  };
  return (
    <Link
      className={`${cn('item')} ${state}`}
      to={`/page/${value}`}
      onClick={callbacks.changePage}
    >
      {value}
    </Link>
  )
}

PaginationItem.propTypes = {
  value: propTypes.number.isRequired,
  state: propTypes.string.isRequired,
  changePage: propTypes.func
}

PaginationItem.defaultProps = {
  changePage: () => { }
}

export default React.memo(PaginationItem)
