import React from 'react';
import propTypes from 'prop-types';
import './styles.css';
import {cn as bem} from "@bem-react/classname";

function Pagination(props) {

  let cn = bem('Pagination')

  let arrPage = [];
  let arrPageCut = [];
  for (let i = 1; i <=props.numOfPages; i++) {arrPage.push(i)};

  switch (true){
    case props.activePage<3: arrPageCut = arrPage.slice(0,3);
    break;
    case props.activePage===3: arrPageCut = arrPage.slice(props.activePage - 3, props.activePage + 1);
    break;
    case props.activePage>=props.numOfPages-2: arrPageCut = arrPage.slice(props.numOfPages-4);
    break;
    default: arrPageCut = arrPage.slice(props.activePage - 2, props.activePage + 1)
  }
  return (
    <div className={cn()}>
      {props.activePage>3?
        <>
        <span onClick={(e) => { props.changePage(1)}}
            className={cn('pageButton')}> 1
        </span>
        <span className={cn('gap')}>
        ...
        </span>
        </>
      :''}
      {arrPageCut.map(u => {return (
        <span 
          key={u.toString()}
          onClick={(e) => { props.changePage(u) }}
          className={cn('pageButton',{'active':props.activePage==u})}> {u}  
        </span>)
      })}
        {props.activePage<(props.numOfPages-2)?<>
        <span className={cn('gap')}>...</span>
        <span onClick={(e) => { props.changePage(props.numOfPages)}}
              className={cn('pageButton')}>
          {props.activePage<(props.numOfPages-2)?`${props.numOfPages}`:''}
        </span>
        </>:''}
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
