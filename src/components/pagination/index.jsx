import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import propTypes from 'prop-types';
import getPaginationPages from '../../utils/getPaginationPages';
import './style.css';

const Pagination = ({ current, last, route }) => {
  const [pages, setPages] = useState(false); // чтобы map срабатывал когда посчитаются страницы

  useEffect(() => {
    setPages(getPaginationPages(current, last))
  }, [current, last]);

  return (
    <div className='pagination'>
      {pages && pages.map(item =>
        (item.type === 'current')
        ? <p key={item.key} className='pagination__active-link'>{item.value}</p>
          : (item.type === 'space') 
          ? <p key={item.key} className='pagination__separator'>...</p>
            : <Link to={route + item.value} key={item.key} className='pagination__link'>{item.value}</Link>
      )}
    </div>
  )
}

Pagination.propTypes = {
  current: propTypes.number,
  last: propTypes.number,
  route: propTypes.string
};

export default React.memo(Pagination);