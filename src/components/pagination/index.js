import React, { useEffect, useState } from 'react';
import propTypes from 'prop-types';
import {cn as bem} from "@bem-react/classname";
import './style.css';
import usePagination from "../../utils/use-pagination";
import classNames from "classnames";


function Pagination(props) {
  const cn = bem('Pagination');

  const pages = usePagination(props.total, props.limit, props.page);

  return (
    <ul className={cn()}>
      {pages.map(item => {
        const itemClass = classNames({
          "Pagination-item": true,
          active: item === props.page
        })

        if (item === '...') {
          return <li>{item}</li>
        } else {
          return (
            <li
              className={itemClass}
              onClick={props.onPageChange(item)}>
              {item}
            </li>
          )
        }
      })}
    </ul>
  )
}

Pagination.propTypes = {

}

Pagination.defaultProps = {

}

export default React.memo(Pagination);
