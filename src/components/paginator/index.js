import React from 'react';
import propTypes from 'prop-types';
import {cn as bem} from "@bem-react/classname";
import uuid from 'react-uuid';
import { paginate } from '../../utils/paginate';

import 'style.css';

function Paginator({pagesCount, page, changePageNumber}) {
  const cn = bem('Paginator');

  const array=[];
  for (let i = 1; i <= pagesCount; i++){
    array.push(i);
  }

  const index = page - 1;
  const paginateNumber = paginate(array, index);

  return (
    <div className={cn()}>
      {paginateNumber.map(i => typeof(i) === "number" ?
        <div className={cn('actions', (i===page)&&{status: "active"})} key={uuid()}>
        <button onClick={()=>changePageNumber(i)}>{i}</button> 
        </div>
      :
        <span className={cn('space')} key={uuid()}>{i}</span>
      )}
    </div>
  );
}

Paginator.propTypes = {
  pagesCount: propTypes.number.isRequired,
  page: propTypes.number.isRequired,
  changePageNumber: propTypes.func.isRequired
}

Paginator.defaultProps = {
  page: 1,
  pagesCount: 0

}

export default React.memo(Paginator);
