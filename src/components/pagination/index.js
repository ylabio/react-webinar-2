import React, { useCallback } from 'react';
import propTypes from 'prop-types';
import {cn as bem} from "@bem-react/classname";
import './style.css';
import createRange from "../../utils/createRange";

function Pagination({count, skip, setSkip}) {
  skip = skip + 1;
  const cn = bem('Pagination');
  const range = createRange(count, skip)

  return (
    <ul className={cn()}>
      {range.map((item, i) => {
        const callback = Number.isInteger(item) ? () => setSkip(item) : () => {}
        return (
          <li key={i} className={cn('item', {current: skip === item, ellipsis: item === '...'})} onClick={callback}>
            {item.toString()}
          </li>
        );
      })}
    </ul>
  );
}

Pagination.propTypes = {
  count: propTypes.number.isRequired,
  skip: propTypes.number.isRequired,
  setSkip: propTypes.func
};

Pagination.defaultProps = {
  count: 0,
  skip: 0
};

export default Pagination;