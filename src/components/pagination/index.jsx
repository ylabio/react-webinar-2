import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import propTypes from 'prop-types';
import getPaginationPages from '../../utils/getPaginationPages';
import './style.css';

const Pagination = ({ current, last, route }) => {
  const [pages, setPages] = useState([1, 2, 3]);

  useEffect(() => {
    setPages(getPaginationPages(current, last))
  }, [current, last]);

  return (
    <div className='pagination'>
      {pages.map((item, index) =>
        (item === current) ? <p key={index} className='pagination__active-link'>{item}</p>
          : (item === null) ? <p key={index} className='pagination__separator'>...</p>
            : <Link key={index} to={route + item} className='pagination__link'>{item}</Link>
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