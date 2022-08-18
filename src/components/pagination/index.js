import React from 'react';
import propTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import paginator from '../../utils/paginator';
import './style.css';

function Pagination(props) {  
  const {currentPage, lastPage} = props;
  const cn = bem('Pagination');
  // Получем пагинацию страниц
  const pages = paginator(currentPage, lastPage);

  const callbacks = {
    handleClick: (num) => {
      props.loadPage(num);
    }
  }
  
  return (
    <div className={cn()}>
      <ul className={cn('numbers')}>
        {pages.map((item, idx) => (
          (!isNaN(item)          
          ? <li
              className={cn(`number ${item === currentPage ? 'active' : ''}`)}
              key={idx}
              onClick={() => callbacks.handleClick(item)}
            >
              {item}
            </li>
          : <li className={cn('separator')} key={idx}>
               {item}
            </li>          
          )          
        ))}
      </ul>
    </div>
  );
}

export default React.memo(Pagination);

Pagination.propTypes = {
  currentPage: propTypes.number.isRequired,
  lastPage: propTypes.number.isRequired,
  loadPage: propTypes.func.isRequired,  
}

Pagination.defaultProps = {
};