import React, {useCallback} from 'react';
import propTypes, {number} from 'prop-types';
import {cn as bem} from "@bem-react/classname";
import './style.css';
import {renderPagination} from "../../utils/render-pagination";

function Pagination({selectPage, currentPage, allPages}) {
  const cn = bem('Pagination');

  const {arrPage, firstDots, lastDots} = renderPagination(allPages, currentPage);

  const cb = {
    selectPage: useCallback((item) => {
      selectPage(item);
    }, [])
  }

  return (
    <div className={cn()} >
      <ul className={cn('list')}>
        <li className={currentPage === 0 ? cn('active') : ''}
            onClick={() => cb.selectPage(0)} >1</li>
        {
          firstDots && <li className={cn('dotted')}>...</li>
        }
        {
          arrPage.map(item =>
            <li className={currentPage === item ? cn('active') : ''}
                onClick={() => cb.selectPage(item)}
                key={item}>{item + 1}
            </li>)
        }
        {
          lastDots && <li className={cn('dotted')}>...</li>
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
  currentPage: number,
  allPages: number,
}

Pagination.defaultProps = {
  currentPage: 0,
  allPages: 0,
}

export default React.memo(Pagination);
