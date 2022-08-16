import React, {useCallback} from 'react';
import {Link} from 'react-router-dom';
import propTypes from 'prop-types';
import PaginationUtility from '../../utils/pagination-utility';
import {cn as bem} from "@bem-react/classname";
import './style.css';

function Pagination(props) {

  const cn = bem('Pagination');

  const pagination = PaginationUtility(props.page, props.count);

  return (
    <div className={cn()}>
      {pagination.map((i, index) => 
        ( i==='...' ? 
          <div key={index} className={cn('button')}>...</div> :
          <Link key={index} to={'/'+i} className={(i == props.page)? cn('button-touched') : cn('button')}>
            {i}
          </Link>
        )
      )}
    </div>
  )
}

Pagination.propTypes = {
  page: propTypes.number,
  count: propTypes.number
}

Pagination.defaultProps = {
  page: 1,
  count: 0
}

export default React.memo(Pagination);