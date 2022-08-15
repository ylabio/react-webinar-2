import React from 'react';
import propTypes from 'prop-types';
import {cn as bem} from "@bem-react/classname";
import './styles.css';
import { Link, BrowserRouter as Router, Route, useParams } from "react-router-dom";


function Pagination(props) {
  const cn = bem('Pagination');
  let pages = new Array()
  for (let i = 1; i <= props.pagesCount; i++) {
    pages.push(i)
  }
  console.log(pages)
  console.log(pages)
  console.log("props.currentPage pagination")
  console.log(props.currentPage)
  return (
    
    <div className={cn('wrapper')}>
      {pages.map(item => 
        <Link to={`/page${item}`} key={item}>
        <div key={item} className={item === props.currentPage ? cn('page__active') : cn('page')}>
          {item}
        </div>
      </Link>
      )}
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
