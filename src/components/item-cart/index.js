import React, { useCallback } from 'react';
import propTypes from 'prop-types';
import { cn as bem } from "@bem-react/classname";
import './style.css';
import Button from '../button';

function ItemCart(props) {
  const cn = bem('Item-cart');

  const callbacks = {
    onRemoveItem: useCallback((e) => {
      e.stopPropagation();
      props.callback(props.item)
    }, [props.callback, props.item])
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
        {props.item.price.toLocaleString('ru-RU', { style: 'currency', currency: 'RUB', minimumFractionDigits: 0 })}
      </div>
      <div className={cn('count')}>{props.item.count} шт</div>
      <div className={cn('actions')}>
        <Button onClick={callbacks.onRemoveItem}>
          Удалить
        </Button>
      </div>
    </div>
  )
}

ItemCart.propTypes = {
  item: propTypes.object.isRequired,
}

export default React.memo(ItemCart);