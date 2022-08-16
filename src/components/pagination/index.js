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

  console.log(pages)

  let pages = new Array()
  pagesCount.map((item) =>{
    if ((item === 1) || (item === pagesCount.length)) {
      pages.push(<Link to={`/page${item}`} key={item}>
        <div key={item} className={item === currentPage ? cn('page__active') : cn('page')}>
          {item}
        </div>
      </Link>)
      } else if ((item === (currentPage - 1)) || (item === currentPage) || (item === (currentPage + 1))) {
        pages.push(<Link to={`/page${item}`} key={item}>
          <div key={item} className={item === currentPage ? cn('page__active') : cn('page')}>
            {item}
          </div>
        </Link>)
      } else if ((item < (currentPage - 1)) || (item > (currentPage + 1))) {
        pages.push(<div>
            ...
        </div>)
      }

    
})

if ((currentPage === 1) && (pagesCount > 3)) {
  pages[2] = (<Link to={`/page3`} key={3}> 
               <div key={3} className={cn('page')}>
                 3
               </div>
             </Link>)
}
  console.log("pages 2")
  console.log(pages[2])
  
  return (
    
    <div className={cn('wrapper')}>
      {/* {pagesCount.map(item => 
        <Link to={`/page${item}`} key={item}>
        <div key={item} className={item === props.currentPage ? cn('page__active') : cn('page')}>
          {item}
        </div>
      </Link>
      )} */}
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
