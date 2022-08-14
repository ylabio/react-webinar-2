import React from 'react';
import propTypes, { array } from 'prop-types';
import {cn as bem} from "@bem-react/classname";
import uuid from 'react-uuid';
import { paginate } from '../../utils/paginate';
import 'style.css';

function Paginator({pagesCount, page, load}) {
  const cn = bem('Paginator');

  const array=[];
  for (let i = 1; i <= pagesCount; i++){
    array.push(i);
  }

  const paginateNumber = paginate(array, page);

  return (
    <div className={cn()}>
      {paginateNumber.map(i => typeof(i) === "number" ?
        <div className={cn('actions', (i===page+1)&&{status: "active"})} key={uuid()}>
          <button onClick={()=>load(i-1)}>{i}</button>
        </div>
      :
        <span className={cn('space')} key={uuid()}>{i}</span>
      )}
    </div>
  );
}

Paginator.propTypes = {
  pagesCount: propTypes.number,
  page: propTypes.number,
  load: propTypes.func.isRequired
}

export default React.memo(Paginator);
