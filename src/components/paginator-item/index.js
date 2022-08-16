import React from 'react';
import propTypes from 'prop-types';
import {cn as bem} from '@bem-react/classname';
import './style.css';

function PaginatorItem({value, active, callback, className, ...props}) {
  const cn = bem('PaginatorItem');

  return (
    <span
      {...props}
      className={`${className || cn({active: active, wide: value >= 100})}`}
      onClick={() => callback(value)}
    >
      {value}
    </span>
  );
}

PaginatorItem.propTypes = {
  active: propTypes.bool,
  callback: propTypes.func.isRequired,
};

PaginatorItem.defaultProps = {
  callback: () => {},
};

export default React.memo(PaginatorItem);
