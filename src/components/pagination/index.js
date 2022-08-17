import React from 'react';
import propTypes from 'prop-types';
import {cn as bem} from "@bem-react/classname";
import './style.css';
import {renderPagination} from "../../utils/render-pagination";
import {Link} from "react-router-dom";

function Pagination({currentPage, allPages}) {
  const cn = bem('Pagination');

  const {arrPage, firstDots, lastDots} = renderPagination(allPages, currentPage);

  return (
    <div className={cn()} >
      <div className={cn('list')}>
        {
          allPages > 1 &&
          <Link className={currentPage === 1 ? cn('active') : ''}
             to={`/page/1`}
          >
            1
          </Link>
        }
        {
          firstDots && <li className={cn('dotted')}>...</li>
        }
        {
          allPages > 2 &&
          arrPage.map(item =>
            <Link className={currentPage === item ? cn('active') : ''}
                to={`/page/${item}`}
                key={item}>{item}
            </Link>
          )
        }
        {
          lastDots && <li className={cn('dotted')}>...</li>
        }
        {
          allPages > 1 &&
          <Link className={currentPage === allPages ? cn('active') : ''}
             to={`/page/${allPages}`}
          >
            {allPages}
          </Link>
        }
      </div>
    </div>
  )
}

Pagination.propTypes = {
  currentPage: propTypes.number,
  allPages: propTypes.number,
}

Pagination.defaultProps = {
  currentPage: 0,
  allPages: 0,
}

export default React.memo(Pagination);
