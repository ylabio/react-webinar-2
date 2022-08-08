import React, { useCallback, useState } from 'react';
import propTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import './style.css';
import Button from '../button';

function Item(props) {
  const cn = bem('Item');

  const callbacks = {
    onAddItemInCart: useCallback(
      (e) => {
        e.stopPropagation();
        props.onAddItemInCart(props.item);
      },
      [props.onAddItemInCart, props.item]
    ),
    onDeleteItemFromCart: useCallback(
      (e) => {
        e.stopPropagation();
        props.onDeleteItemFromCart(props.item);
      },
      [props.onDeleteItemFromCart, props.item]
    ),
  };

  return (
    <div className={cn()} onClick={callbacks.onClick}>
      <div className={cn('number')}>
        {props.itemType === 'Cart' ? props.itemStackNumber : props.item.code}
      </div>
      <div className={cn('title')}>{props.item.title}</div>
      <div className={cn('price')}>{`${props.item.price.toLocaleString('ru-RU')} ₽`}</div>
      {props.item.quantity && <div className={cn('quantity')}>{`${props.item.quantity} шт`}</div>}
      <div className={cn('actions')}>
        <Button
          onClick={
            props.itemType === 'Cart' ? callbacks.onDeleteItemFromCart : callbacks.onAddItemInCart
          }
        >
          {props.itemType === 'Cart' ? 'Удалить' : 'Добавить'}
        </Button>
      </div>
    </div>
  );
}

Item.propTypes = {
  item: propTypes.object.isRequired,
  onAddItemInCart: propTypes.func,
  onDeleteItemFromCart: propTypes.func,
  itemType: propTypes.string,
  itemStackNumber: propTypes.number,
};

Item.defaultProps = {
  onAddItemInCart: () => {},
  onDeleteItemFromCart: () => {},
};

export default React.memo(Item);
