import React from "react";
import propTypes from "prop-types";
import {cn as bem} from "@bem-react/classname";
import "./style.css";
import pages from "../../utils/pages";

function Pagination(props) {
  const cn = bem('Pagination');

  return (
    <ul className={cn()}>
      {pages(props.itemsNumber, props.currentPage, props.itemsPerPage)
        .map((item, index) => (
          <li key={index}
              className={`${cn('item')}
                          ${ item ? '' : cn('item', {empty: true})}
                          ${item === props.currentPage ? cn('item', {current: true}) : ''}`}
              onClick={ () => props.onChange(item) }>{item ? item : `...`}</li>
        ))}
    </ul>
  )
}

Pagination.propTypes = {
  itemsNumber: propTypes.number.isRequired,
  currentPage: propTypes.number.isRequired,
  itemsPerPage: propTypes.number.isRequired,
}

export default React.memo(Pagination);

