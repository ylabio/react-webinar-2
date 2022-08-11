import React, { useCallback, useState } from 'react';
import propTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import './style.css';
import Button from '../../button';

function ItemKatalog(props) {
  const cn = bem('ItemKatalog');

  const callbacks = {
    onAddItemInCart: useCallback(
      (e) => {
        e.stopPropagation();
        props.onAddItemInCart(props.item);
      },
      [props.onAddItemInCart, props.item]
    ),
  };

  return (
    <div className={cn()} onClick={callbacks.onClick}>
      <div className={cn('number')}>{props.item.code}</div>
      <div className={cn('title')}>{props.item.title}</div>
      <div className={cn('price')}>{`${props.item.price.toLocaleString('ru-RU')} ₽`}</div>
      <div className={cn('actions')}>
        <Button onClick={callbacks.onAddItemInCart}>Добавить</Button>
      </div>
    </div>
  );
}

ItemKatalog.propTypes = {
  item: propTypes.object.isRequired,
  onAddItemInCart: propTypes.func,
};

ItemKatalog.defaultProps = {
  onAddItemInCart: () => {},
};

export default React.memo(ItemKatalog);
