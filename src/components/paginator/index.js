import React from 'react';
import propTypes from 'prop-types';
import {cn as bem} from '@bem-react/classname';
import './style.css';
import pagesNumber from '../../utils/pagesNumber';
import PaginatorItem from '../paginator-item';

function Paginator(props) {
  const cn = bem('Paginator');
  console.log(props.currentPage);
  const pagesArray = pagesNumber(props.itemsAmount, props.itemsOnPage);
  const halfRange = Math.floor(props.range / 2);

  return (
    <div className={cn()}>
      {props.currentPage > halfRange + 1 && (
        <PaginatorItem value={1} callback={props.callback} />
      )}
      {props.currentPage > halfRange + 2 && (
        <PaginatorItem value={'...'} className={'dots'} />
      )}
      {pagesArray
        .map((item, index) => (
          <PaginatorItem
            value={item}
            callback={props.callback}
            key={index}
            active={props.currentPage === item}
          />
        ))
        .slice(
          props.currentPage > halfRange
            ? props.currentPage - (halfRange + 1)
            : 0,
          props.currentPage > halfRange
            ? props.currentPage + halfRange
            : props.range
        )}
      {props.currentPage < pagesArray.length - (halfRange + 1) && (
        <PaginatorItem value={'...'} className={'dots'} />
      )}
      {props.currentPage < pagesArray.length - halfRange && (
        <PaginatorItem value={pagesArray.length} callback={props.callback} />
      )}
    </div>
  );
}

Paginator.propTypes = {
  itemsAmount: propTypes.number.isRequired,
  currentPage: propTypes.number.isRequired,
  itemsOnPage: propTypes.number.isRequired,
  callback: propTypes.func.isRequired,
};

Paginator.defaultProps = {
  itemsAmount: 100,
  currentPage: 0,
  itemsOnPage: 10,
  callback: () => {},
};

export default React.memo(Paginator);
