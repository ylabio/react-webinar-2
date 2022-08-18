import React from 'react';
import propTypes from 'prop-types';
import {cn as bem} from "@bem-react/classname";
import './styles.css';
import { Link, BrowserRouter as Router, Route, useParams } from "react-router-dom";


function Pagination(props) {
  const cn = bem('Pagination');
  const currentPage = Number(props.currentPage)

  let pagesCount = new Array()
  for (let i = 1; i <= props.pagesCount; i++) {
    pagesCount.push(i)
  }

  let pages = new Array()
  let separatorAfter = false, separatorBefore = false
  pagesCount.map((item) =>{
    
    if ((item === 1) || (item === pagesCount.length)) {
      separatorAfter = false
      separatorBefore = false
      pages.push(<Link to={`/page${item}`} key={item} className={cn('paginationLink')}>
        <div className={item === currentPage ? cn('page__active') : cn('page')}>
          {item}
        </div>
      </Link>)
      } else if ((item === 3) && (currentPage === 1)) {
        pages.push(<Link to={`/page${item}`} key={item} className={cn('paginationLink')}>
        <div className={item === currentPage ? cn('page__active') : cn('page')}>
          {item}
        </div>
      </Link>)
      } else if ((item === (currentPage - 1)) || (item === currentPage) || (item === (currentPage + 1))) {
        pages.push(<Link to={`/page${item}`} key={item} className={cn('paginationLink')}>
          <div className={item === currentPage ? cn('page__active') : cn('page')}>
            {item}
          </div>
        </Link>)
      } else if ((item < (currentPage - 1)) && !separatorBefore) {
        separatorBefore = true
        pages.push(<div className={cn('separator')} > ... </div>)
      } else if ((item > (currentPage + 1)) && !separatorAfter ) {
        separatorAfter = true
        pages.push(<div className={cn('separator')} > ... </div>)
      }
    
})
  return (
    
    <div className={cn('wrapper')}>
      {pages}
    </div>
  )
}

Pagination.propTypes = {
  sum: propTypes.number
}

Pagination.defaultProps = {
  sum: 0
}

export default React.memo(Pagination);
