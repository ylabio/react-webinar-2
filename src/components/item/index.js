import React, { memo, useCallback } from 'react';
import propTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import './style.css';

function Item({ item, onAddItemToCart }) {
  const cn = bem('Item');

  const callbacks = {
    onAddItemToCart: useCallback(() => {
      onAddItemToCart(item.code, item);
    }, [onAddItemToCart, item]),
  };

  return (
    <div className={cn()}>
      <div className={cn('number')}>{item.code}</div>
      <div className={cn('title')}>{item.title}</div>
      <div className={cn('number')}>
        {item.price.toLocaleString('ru-RU')}&nbsp;₽
      </div>
      <div className={cn('actions')}>
        <button onClick={callbacks.onAddItemToCart}>Добавить</button>
      </div>
    </div>
  );
}

Item.propTypes = {
  item: propTypes.object.isRequired,
  onAddItemToCart: propTypes.func.isRequired,
};

Item.default = {
  onAddItemToCart: () => {},
};

export default memo(Item);
