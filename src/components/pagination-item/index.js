import React, { useMemo } from 'react';
import "./style.css"
import { cn as bem } from "@bem-react/classname";
import { Link, } from "react-router-dom";
import propTypes from 'prop-types';

function PaginationItem({ value, state }) {
  const cn = bem('Pagination');
  return (
    <Link
      className={`${cn('item')} ${state}`}
      to={`/page/${value}`}
    >
      {value}
    </Link>
  )
}

PaginationItem.propTypes = {
  value: propTypes.number.isRequired,
  state: propTypes.string.isRequired
}

export default React.memo(PaginationItem)
