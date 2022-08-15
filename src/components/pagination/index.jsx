import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import getPaginationPages from '../../utils/getPaginationPages';
import './style.css';

const Pagination = ({ pagesCount }) => {
  const currentPage = +useParams().page || 1;

  const [pages, setPages] = useState(['l', 'o', 'a', 'd', '...', 1]);

  useEffect(() => {
    setPages(getPaginationPages(currentPage, pagesCount))
  }, [currentPage, pagesCount]);

  return (
    <div className='pagination'>
      {pages.map(item => item === '...'
        ? <p key={item} className='pagination__separator'>...</p>
        : item === currentPage
          ? <p key={item} className='pagination__active-link'>{item}</p>
          : <Link to={'/catalog/' + item} key={item} className='pagination__link'>{item}</Link>
      )}
    </div>
  )
}

export default React.memo(Pagination);