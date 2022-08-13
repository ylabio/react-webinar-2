import React, {useCallback} from 'react';
import {Link} from 'react-router-dom';
import propTypes from 'prop-types';
import {cn as bem} from "@bem-react/classname";
import './style.css';

function Pagination(props) {

  const cn = bem('Pagination');

  let list = [];
  let lastPage = Math.round(props.count/10);

  //сборка для элемента пагинации начало
  if (props.page < 3) {
    for (let i = 1 ; i < 7 ; i++){
      if(i < 4)  
        list.push(
          <Link key={i} to={'/'+i} className={(props.page === i)? cn('button-touched')
          : cn('button')}>
            {i}
          </Link>
        );
      if (i === 4)
        list.push(
          <div key={i} className={cn('button')}>...</div>
        );
    }
    list.push(
      <Link key={lastPage}  to={"/"+lastPage} className={(props.page === lastPage)? cn('button-touched')
      : cn('button')}>
        {lastPage}
      </Link>
    );
  }
  //сборка для элемента пагинации
  if (props.page === 3) {
    for (let i = 1 ; i < 7 ; i++){
      if(i <= 4)  
        list.push(
          <Link key={i} to={'/'+i} className={(props.page === i)? cn('button-touched') 
          : cn('button')}>
            {i}
          </Link>
        );
      if (i === 5)
        list.push(
          <div key={i} className={cn('button')}>...</div>
        );
    }
    list.push(
      <Link key={lastPage}  to={"/"+lastPage} className={(props.page === lastPage)? cn('button-touched') 
      : cn('button')}>
        {lastPage}
      </Link>
    );
  }
  //сборка для элемента пагинации
  if ((props.page > 3) && (props.page < lastPage-2)) {
    list.push(
        <Link key={1}  to="/1" className={(props.page === 1)? cn('button-touched') 
        : cn('button')}>
          {1}
        </Link>
    );
    list.push(
        <div key={2} className={cn('button')}>...</div>
    );
    for (let i = 0 ; i < 3 ; i++){
      if((i <= 5))  
        list.push(
          <Link key={i+3} to={'/'+(i+props.page-1)} className={(i === 1)? cn('button-touched') 
          : cn('button')}>
            {i+props.page-1}
          </Link>
        );
    }
    list.push(
      <div key={lastPage-1} className={cn('button')}>...</div>
    );
    list.push(
      <Link key={lastPage} to={'/'+lastPage} className={(props.page === lastPage)? cn('button-touched') 
      : cn('button')}>
        {lastPage}
      </Link>
    );
  }
  //сборка для элемента пагинации
  if ((props.page > 3) && (props.page === lastPage-2 || props.page === lastPage-1)) {
    list.push(
      <Link key={1}  to="/1" className={(props.page === 1)? cn('button-touched') 
      : cn('button')}>
        {1}
      </Link>
    );
    list.push(
      <div key={2} className={cn('button')}>...</div>
    );
    for (let i = 0 ; i < 3 ; i++){
      if(i <= 3)  
        list.push(
          <Link key={i+3} to={'/'+(i+props.page-1)} className={(i === 1)? cn('button-touched') 
          : cn('button')}>
            {i+props.page-1}
          </Link>
        );
    }
    if (props.page === lastPage-2)
      list.push(
        <Link key={lastPage} to={'/'+(lastPage)} className={(props.page === 13)? cn('button-touched') 
        : cn('button')}>
          {lastPage}
        </Link>
      );
  }
  //сборка для элемента пагинации
  if ((props.page > 3) && (props.page === lastPage)){
    list.push(
      <Link key={1}  to="/1" className={(props.page === 1)? cn('button-touched') 
      : cn('button')}>
        {1}
      </Link>
    );
    list.push(
      <div key={2} className={cn('button')}>...</div>
    );
    for (let i = 0 ; i < 3 ; i++){
      list.push(
        <Link key={i+3} to={'/'+(i+props.page-2)} className={(i === 2)? cn('button-touched') 
        : cn('button')}>
          {i+props.page-2}
        </Link>
      );
    }
  }
  
  return (
    <div className={cn()}>
     {list}
    </div>
  )
}

Pagination.propTypes = {
  page: propTypes.number,
  count: propTypes.number
}

Pagination.defaultProps = {
  page: 1,
  count: 0
}

export default React.memo(Pagination);