import React, {useCallback, useMemo} from 'react';
import propTypes from 'prop-types';
import {cn as bem} from "@bem-react/classname";
import './style.css';
import {usePagination} from "../../utils/usePagination";

function Pagination({count, paginate, activePage}) {
  const cn = bem('Pagination');

  const paginationRange = usePagination({
    count,
    activePage
  });

  return (
    <div className={cn()}>
      <ul className={cn('page')}>
        {
          paginationRange.map((pageNumber, index) => {
            if (pageNumber === '...') {
              return <li className={cn('page-dots')} key={`${pageNumber}_${index}`}>{pageNumber}</li>;
            }
            return (
              <li className={cn('page-item') + ' ' + (activePage === pageNumber ? 'active' : '')} 
                  key={pageNumber} 
                  onClick={() => paginate(pageNumber)}>
                {pageNumber}
              </li>
            )
          })
        }
      </ul>
    </div>
  )   
}

Pagination.propTypes = {
  count: propTypes.number.isRequired,
  paginate: propTypes.func,
  activePage: propTypes.number.isRequired
}

Pagination.defaultProps = {
  count: 1,
  paginate: () => {},
  activePage: 1
}

export default React.memo(Pagination);
