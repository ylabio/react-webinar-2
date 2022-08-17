import React from "react";
import propTypes from "prop-types";
import {cn as bem} from "@bem-react/classname";
import "./style.css";
import pages from "../../utils/pages";
import {Link} from "react-router-dom";

function Pagination(props) {
  const cn = bem('Pagination');

  return (
    <ul className={cn()}>
      {pages(props.itemsNumber, props.currentPage, props.itemsPerPage)
        .map((item, index) => (
          <li key={index}
              onClick={props.onChange}
              className={`${cn('item')} ${ item ? '' : cn('item', {empty: true})} ${item === props.currentPage ? cn('item', {current: true}) : ''}`}>
            <Link className={cn('link')} to={`${props.baseLink}${item}`}>{item ? item : `...`}</Link>
          </li>
        ))}
    </ul>
  )
}

Pagination.propTypes = {
  itemsNumber: propTypes.number,
  currentPage: propTypes.number.isRequired,
  itemsPerPage: propTypes.number,
  baseLink: propTypes.string.isRequired,
  onChange: propTypes.func,
}

Pagination.defaultProps = {
  itemsNumber: 0,
  itemsPerPage: 10,
  onChange: () => {},
}

export default React.memo(Pagination);

