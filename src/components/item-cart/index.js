import React, {useCallback} from 'react';
import propTypes from 'prop-types';
import {cn as bem} from "@bem-react/classname";
import './style.css';

function ItemCart(props) {
  const cn = bem('Item');

  const callbacks = {
      onButton: useCallback(() => {
          props.onButton(props.item.code);
      }, [props.item.code])
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
        {props.item.price.toLocaleString('ru-RU')} ₽
      </div>
      <div className={cn('quantity')}>
        {props.item.quantity} шт
      </div>
      <div className={cn('actions')}>
        <button onClick={callbacks.onButton}>
          {props.buttonText}
        </button>
      </div>
    </div>
  )
}

ItemCart.propTypes = {
  item: propTypes.object.isRequired,
  onButton: propTypes.func.isRequired,
  buttonText: propTypes.string.isRequired
}

export default React.memo(ItemCart);
