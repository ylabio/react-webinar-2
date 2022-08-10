import React, { useCallback } from 'react';
import propTypes from 'prop-types';
import { cn as bem } from "@bem-react/classname";
import './style.css';
import Button from '../button';

function Item(props) {
  const cn = bem('Item');

  const callbacks = {
    onAddItem: useCallback((e) => {
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
      <div className={cn('actions')}>
        <Button onClick={callbacks.onAddItem}>
          Добавить
        </Button>
      </div>
    </div>
  )
}

Item.propTypes = {
  item: propTypes.object.isRequired,
}

export default React.memo(Item);
