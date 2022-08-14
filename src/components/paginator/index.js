import React from 'react';
import propTypes from 'prop-types';
import {cn as bem} from '@bem-react/classname';
import './style.css';

function Paginator(props) {
  const cn = bem('Paginator');

  return (
    <div className={cn()}>
      {props.pagesTotal.map((page, idx) => (
        <button>{idx + 1}</button>
      ))}
    </div>
  );
}

Paginator.propTypes = {
  currentPage: propTypes.number,
  pagesTotal: propTypes.number,
  onPageClick: propTypes.func
};

export default React.memo(Paginator);
