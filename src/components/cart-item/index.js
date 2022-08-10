import React, {useCallback, useState} from 'react';
import propTypes from 'prop-types';
import {cn as bem} from "@bem-react/classname";

import './style.css';

function CartItem(props) {
  const cn = bem('Cart-item');

  const callbacks = {
    onHandleBtn: useCallback((e) => {
      e.stopPropagation();
      props.onHandleBtn(props.item.code)
    }, [props.onHandleBtn,  props.item])
  };

  return (
    <div className={cn()}>
      <div className={cn('number')}>
        {props.item.code}
      </div>
      <div className={cn('title')}>
        {props.item.title}
      </div>
      <p className={cn('price')}>
        {`${props.item.price.toLocaleString('ru')} ₽`}
      </p>
      
      <p className={cn('amount')}>
        {props.item.count} шт
      </p> 
      <div className={cn('actions')}>
        <button onClick={callbacks.onHandleBtn}>
          Удалить
        </button>
      </div>
    </div>
  )
}

CartItem.propTypes = {
  item: propTypes.object.isRequired,
  onHandleBtn: propTypes.func.isRequired,
  
}

CartItem.defaultProps = {
  onHandleBtn: () => {}
}

export default React.memo(CartItem);
