import React from 'react';
import paginationPages from '../../utils/pagination';
import './style.css';
import { cn as bem } from '@bem-react/classname';
import propTypes from 'prop-types';

const Pagination = ({ currentPage, totalPages, onChange }) => {
  const cn = bem('Pagination');
  const pages = paginationPages(totalPages, currentPage);
  const separator = '...';

  console.log(pages);
  return (
    <div className={cn()}>
      {pages.map((page, index) =>
        page === separator ? (
          <div className={cn('separator')} key={index}>
            {page}
          </div>
        ) : (
          <div
            className={cn('page', { isActive: page === currentPage })}
            key={index}
            onClick={() => onChange(page)}
          >
            {page}
          </div>
        )
      )}
    </div>
  );
};

Pagination.propTypes = {
  currentPage: propTypes.number.isRequired,
  totalPages: propTypes.number.isRequired,
  onChange: propTypes.func,
};

Pagination.defaultProps = {};

export default React.memo(Pagination);
