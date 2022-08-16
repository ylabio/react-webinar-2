import React from 'react';
import propTypes from 'prop-types';
import {cn as bem} from "@bem-react/classname";
import './style.css';
import {renderPagination} from "../../utils/render-pagination";
import {useNavigate} from "react-router-dom";

function Pagination({currentPage, allPages}) {
  const cn = bem('Pagination');
  const navigate = useNavigate();

  const {arrPage, firstDots, lastDots} = renderPagination(allPages, currentPage);

  return (
    <div className={cn()} >
      <ul className={cn('list')}>
        {
          allPages > 1 &&
          <li className={currentPage === 1 ? cn('active') : ''}
             onClick={() => navigate(`/page/1`, {replace: true})}
          >
            1
          </li>
        }
        {
          firstDots && <li className={cn('dotted')}>...</li>
        }
        {
          allPages > 2 &&
          arrPage.map(item =>
            <li className={currentPage === item ? cn('active') : ''}
                onClick={() => navigate(`/page/${item}`, { replace: true })}
                key={item}>{item}
            </li>
          )
        }
        {
          lastDots && <li className={cn('dotted')}>...</li>
        }
        {
          allPages > 1 &&
          <li className={currentPage === allPages ? cn('active') : ''}
             onClick={() => navigate(`/page/${allPages}`, {replace: true})}
          >
            {allPages}
          </li>
        }
      </ul>
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
