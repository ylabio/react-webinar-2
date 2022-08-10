import React, {useCallback, useEffect, useState} from 'react';
import propTypes from 'prop-types';
import {cn as bem} from "@bem-react/classname";
import './style.css';

function Item(props) {
  const cn = bem('Item');

  const callbacks = {
    onBtnItem: useCallback((e) => {
      e.stopPropagation();
      props.onBtnItems(props.item);
      props.calcCountAndSumCart();
    }, [props.onBtnItems, props.item])
  };

  return (
    <div className={cn()}>
      <div className={cn('number')}>
        {props.index + 1}
      </div>
      <div className={cn('title')}>
        {props.item.title}
      </div>
      <div className={cn('price')}>
        {props.item.price.toLocaleString('ru-RU')} ₽
      </div>
      {
        typeof props.item.count !== 'undefined'
        ? <div className={cn('count')}>
            {props.item.count && props.item.count + ' шт'}
          </div>
        : ''
      }
      <div className={cn('actions')}>
        <button onClick={callbacks.onBtnItem}>
          {props.btn}
        </button>
      </div>
    </div>
  )
}

Item.propTypes = {
  item: propTypes.object.isRequired,
  index: propTypes.number,
  btn: propTypes.string,
  onBtnItems: propTypes.func.isRequired,
  calcCountAndSumCart: propTypes.func.isRequired,
}

Item.defaultProps = {
  item: {},
  index: 0,
  btn: '',
  onBtnItems: () => {},
  calcCountAndSumCart: () => {},
}

export default React.memo(Item);
