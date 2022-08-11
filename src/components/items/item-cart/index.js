import React, { useCallback, useState } from 'react';
import propTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import './style.css';
import Button from '../../button';

function ItemCart(props) {
  const cn = bem('ItemCart');

  const callbacks = {
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
      <div className={cn('number')}>{props.itemStackNumber}</div>
      <div className={cn('title')}>{props.item.title}</div>
      <div className={cn('price')}>{`${props.item.price.toLocaleString('ru-RU')} ₽`}</div>
      {props.item.quantity && <div className={cn('quantity')}>{`${props.item.quantity} шт`}</div>}
      <div className={cn('actions')}>
        <Button onClick={callbacks.onDeleteItemFromCart}>Удалить</Button>
      </div>
    </div>
  );
}

ItemCart.propTypes = {
  item: propTypes.object.isRequired,
  onDeleteItemFromCart: propTypes.func,
  itemStackNumber: propTypes.number.isRequired,
};

ItemCart.defaultProps = {
  onDeleteItemFromCart: () => {},
};

export default React.memo(ItemCart);
