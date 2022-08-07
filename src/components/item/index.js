import React, { useCallback, useState } from 'react';
import propTypes from 'prop-types';
import { cn as bem } from "@bem-react/classname";
import './style.css';
import Button from '../button';

function Item(props) {
  const cn = bem('Item');

  const callbacks = {
    onAddCart: useCallback((e) => {
      e.stopPropagation();
      props.onAddCart(props.item)
    }, [props.onAddCart, props.item])
  };

  return (
    <div className={cn()}>
      <div className={cn('number')}>
        {props.item.code}
      </div>
      <div className={cn('title')}>
        {props.item.title}
      </div>
      <div className={cn('info')}>
        {props.item.price.toLocaleString('ru-RU', { style: 'currency', currency: 'RUB', minimumFractionDigits: 0 })}
      </div>
      <div className={cn('actions')}>
        <Button onClick={callbacks.onAddCart}>
          Добавить
        </Button>
      </div>
    </div>
  )
}

Item.propTypes = {
  item: propTypes.object.isRequired,
  onAddCart: propTypes.func
}

Item.defaultProps = {
  onAddCart: () => { }
}

export default React.memo(Item);
