import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import propTypes from "prop-types";
import { getPages, getLink } from '../../utils/pagination-utils';
import './style.css';

function Pagination ({ current, last, route }) {
  const [pages, setPages] = useState([route]);

  useEffect(() => {
    setPages(getPages(current, last));
  }, [current, last, route]);

  return (
    <div className='pagination'>
      {pages.map((item, index) =>
        (item === current) ? <p key={index} className='pagination__active-link'>{item}</p>
          : (item === null) ? <p key={index} className='pagination__separator'>...</p>
            : <Link key={index} to={getLink(item, route)} className='pagination__link'>{item}</Link>
      )}
    </div>
  )
}

Pagination.propTypes = {
  current: propTypes.number,
  last: propTypes.number,
  route: propTypes.string,
};

Pagination.defaultProps = {
  current: 1,
  last: 1,
  route: '/catalog?page=1',
};

export default React.memo(Pagination);
