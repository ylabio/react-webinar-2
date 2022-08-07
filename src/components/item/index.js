import React, {useCallback} from 'react';
import {cn as bem} from "@bem-react/classname";
import './style.css';

function Item(props) {
  const cn = bem('Item');

  const callbacks = {

    onDeleteFromCart: useCallback(() => {
      props.onDeleteFromCart(props.item.code)
    }, [props.onDelete,  props.item]),

    onAddToCart: useCallback(() => {
      props.onAddToCart(props.item);
    },[])
  };
  
  return (
    <div className={cn()} onClick={callbacks.onClick}>
      <div className={cn('number')}>
        {props.item.number || props.item.code}
      </div>
      <div className={cn('title')}>
        {props.item.title}
      </div>
      <div className={cn('price')}>
        {props.item.price.toLocaleString('Ru-ru')} ₽
      </div>

      {props.item.count &&
      <div className={cn('stats')}>{props.item.count}</div> }

      {props.onAddToCart.toString() !== 'function onAddToCart() {}' &&
      <div className={cn('actions')}>
        <button onClick={callbacks.onAddToCart}>
          Добавить
        </button>
      </div>}
      
    </div>
  )
}

export default React.memo(Item);
