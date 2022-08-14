import React from 'react';
import propTypes from 'prop-types';
import {cn as bem} from '@bem-react/classname';
import './style.css';

function Paginator(props) {
  const cn = bem('Paginator');

  const pagesNumberArr = Array.from(
    {length: props.pagesTotal},
    (_, idx) => idx + 1
  );

  return (
    <div className={cn()}>
      {pagesNumberArr.map(num => (
        <button key={num} onClick={() => props.onPageClick(num)}>
          {num}
        </button>
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
