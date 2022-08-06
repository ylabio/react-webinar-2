import React, { useCallback, useState } from 'react';
import propTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import './style.css';

function Item(props) {
  const cn = bem('Item');

  const callbacks = {
    onAddItemToBin: useCallback(
      (code) => {
        props.onAddItemToBin(code);
      },
      [props.onAddItemToBin, props.item]
    ),
  };

  return (
    <div className={cn()}>
      <div className={cn('number')}>{props.item.code}</div>
      <div className={cn('title')}>{props.item.title}</div>
      <div className={cn('price')}>{`${props.item.price.toLocaleString('ru-RU')} ₽`}</div> 
      <div className={cn('actions')}>
        <button onClick={() => callbacks.onAddItemToBin(props.item.code)}>Добавить</button>
      </div>
    </div>
  );
}

Item.propTypes = {
  item: propTypes.object.isRequired,
  onAddItemToBin: propTypes.func.isRequired,
};

Item.defaultProps = {
  onAddItemToBin: () => {},
};

export default React.memo(Item);
