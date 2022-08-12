import React from 'react';
import {Link} from 'react-router-dom';
import propTypes from 'prop-types';
import {cn as bem} from '@bem-react/classname';
import './style.css';

function Pagination(props) {
  const cn = bem('Pagination');

  const callbacks = {
    // onRemove: useCallback((e) => props.onRemove(props.item._id), [props.onRemove,  props.item])
  };

  const numbers = [];

  for (let i = 1; i <= props.amount; i++) {
    numbers.push(i);
  };

  return (
    <ul className={cn()}>
      {numbers.map((item) =>
        <li className={cn('item')} key={item}>
          <Link
            to={`/page/${item}`}
            className={item === props.pageNumber ? cn('link', {active: true}) : cn('link')}
          >
            {item}
          </Link>
        </li>
      )}
    </ul>
  )
}

Pagination.propTypes = {
  amount: propTypes.number.isRequired,
  pageNumber: propTypes.number,
}

Pagination.defaultProps = {
  pageNumber: 1,
}

export default React.memo(Pagination);
