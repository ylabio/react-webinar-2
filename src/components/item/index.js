import React, {useCallback, useState} from 'react';
import propTypes from 'prop-types';
import {cn as bem} from "@bem-react/classname";
import './style.css';
import Button from '../ui/button';

function Item(props) {
  const cn = bem('Item');
  
  //! Суммируем цену товаров одной позиции
  const itemsPrice =  props.item.price * props.item.amount;

  const callbacks = {
    deleteItem: useCallback((e) => {
      e.stopPropagation();
      props.deleteFromCart(props.item)
    }, [props.deleteFromCart, props.item]),

    createItem: useCallback(() => {
      props.onAddToCart(props.item)
    }, [props.onAddToCart,  props.item])
  };

  return (
    <div className={cn()} onClick={callbacks.onClick}>
      <div className={cn('number')}>
        {props.item.code}
      </div>
      <div className={cn('title')}>
        {props.item.title}
      </div>
      <div className={cn('price_block')}>
        <span>{props.cartItem ? 
          itemsPrice.toLocaleString('ru-RU') : 
          props.item.price.toLocaleString('ru-RU')} &#8381;
        </span>
        {props.cartItem ? <span className={cn('cart_count')}>{props.item.amount} шт</span> : null}
      </div>
      <div className={cn('actions')}>
        {props.cartItem ? (
          <Button onClick={callbacks.deleteItem}>Удалить</Button>
        ) : (
          <Button onClick={callbacks.createItem}>Добавить</Button>
        )}
      </div>
    </div>
  )
}

Item.propTypes = {
  item: propTypes.object.isRequired,
  deleteFromCart: propTypes.func.isRequired,
  onAddToCart: propTypes.func.isRequired,
}

Item.defaultProps = {
  deleteFromCart: () => {},
  onAddToCart: () => {}
}

export default React.memo(Item);
