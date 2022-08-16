import {cn as bem} from '@bem-react/classname';
import propTypes from 'prop-types';
import React from 'react';
import {generatePaginationSequence} from '../../utils/gen-pagination-seq';
import {joinClasses} from '../../utils/join-classes';
import './style.css';

function Pagination({total, active, siblings, onChange, className}) {
  const cn = bem('Pagination');
  const separator = '...';
  const pages = generatePaginationSequence(total, active, siblings, separator);

  return (
    <div className={cn('wrapper')}>
      <ul className={cn()}>
        {pages.map((i, index) =>
          i === separator ? (
            <li key={`${i}_${index}`} className={cn('separator')}>
              {i}
            </li>
          ) : (
            <li
              key={i}
              className={joinClasses(cn('page'), active === i ? cn('page', {active: true}) : '')}
              onClick={() => onChange(i)}
            >
              {i}
            </li>
          )
        )}
      </ul>
    </div>
  );
}

Pagination.propTypes = {
  total: propTypes.number.isRequired,
  active: propTypes.number.isRequired,
  onChange: propTypes.func.isRequired,
  siblings: propTypes.number,
  className: propTypes.string
};

Pagination.defaultProps = {
  siblings: 1
};

export default React.memo(Pagination);
