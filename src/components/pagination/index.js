import React, {useCallback} from 'react';
import propTypes, {number} from 'prop-types';
import {cn as bem} from "@bem-react/classname";
import './style.css';

function Pagination({selectPage, currentPage, allPages, limit, pagesPagination}) {
  const cn = bem('Pagination');

  const cb = {
    selectPage: useCallback((item) => {
      selectPage(item, limit);
    }, [])
  }

  return (
    <div className={cn()} >
      <ul className={cn('list')}>
        <li className={currentPage === 0 ? cn('active') : ''} onClick={() => cb.selectPage(0)} >1</li>
        {
          (currentPage >= 3 && allPages > 4) && <li className={cn('dotted')}>...</li>
        }
        {
          pagesPagination.map(item =>
            <li className={currentPage === item ? cn('active') : ''}
                onClick={() => cb.selectPage(item)}
                key={item}>{item + 1}
            </li>)
        }
        {
          (currentPage <= allPages - 4 && allPages > 4) && <li className={cn('dotted')}>...</li>
        }
        <li className={currentPage === allPages - 1 ? cn('active') : ''}
            onClick={() => cb.selectPage(allPages - 1)}
        >
          {allPages}
        </li>
      </ul>
    </div>
  )
}

Pagination.propTypes = {
  selectPage: propTypes.func.isRequired,
  pagesPagination: propTypes.arrayOf(propTypes.number),
  currentPage: number,
  allPages: number,
  limit: number,
}

Pagination.defaultProps = {
  currentPage: 0,
  allPages: 0,
  limit: 0,
  pagesPagination: [],
}

export default React.memo(Pagination);
