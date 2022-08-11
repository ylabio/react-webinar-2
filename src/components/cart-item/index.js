import React, {useCallback, useState} from 'react';
import propTypes from 'prop-types';
import {cn as bem} from "@bem-react/classname";
import './style.css';

function CartItem(props) {
  const cn = bem('Item');

  const callbacks = {

    onCartItems: useCallback((e) => {
      props.onDeteleCart(props.item.code)
    }, [props.onDeteleCart,  props.item])
  };

  return (
    <div className={cn()}>
      <div className={cn('number')}>
        {props.item.code}
      </div>
      <div className={cn('title')}>
        {props.item.title} 
      </div>
      <div className={cn('price')}>
        {props.item.price.toLocaleString()} &#8381;
      </div>
      <div className={cn('amount')}>
        {props.item.amount} шт.
      </div>
      <div className={cn('actions')}>
        <button onClick={callbacks.onCartItems}>
          Удалить
        </button>
      </div>
    </div>
  )
}

CartItem.propTypes = {
  onDeteleCart: propTypes.func.isRequired,
  item:propTypes.object.isRequired
}

CartItem.defaultProps = {
  onDeteleCart: () => {},
  item:{}
}

export default React.memo(CartItem);
