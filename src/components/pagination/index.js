import React from 'react';
import {Link} from 'react-router-dom';
import propTypes from 'prop-types';
import {cn as bem} from '@bem-react/classname';
import counter from '../../utils/counter';
import getPages from '../../utils/get-pages';
import './style.css';
function Pagination({pageNumber, amount}) {
  const cn = bem('Pagination');
  const pages = getPages(pageNumber, amount);
  return (
    <ul className={cn()}>
      {pages.map((item) =>
        typeof(item) === 'number' ?
        (<li className={cn('item')} key={counter()}>
          <Link
            to={`/page${item}`}
            className={item === pageNumber ? cn('link', {active: true}) : cn('link')}
          >
            {item}
          </Link>
        </li>) : 
        (<li className={cn('item')} key={counter()}>
          {item}
        </li>)
      )}
    </ul>
  )
}
Pagination.propTypes = {
  amount: propTypes.number.isRequired,
  pageNumber: propTypes.number,
}
Pagination.defaultProps = {
  pageNumber: 1,
}
export default React.memo(Pagination);