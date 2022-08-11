import React, { useCallback } from 'react';
import propTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import './style.css';

function Item({ onAddItemToBin, item }) {
  const cn = bem('Item');

  const callbacks = {
    onAddItemToBin: useCallback(
      (code) => {
        onAddItemToBin(code);
      },
      [onAddItemToBin, item]
    ),
  };

  return (
    <div className={cn()}>
      <div className={cn('number')}>{item.code}</div>
      <div className={cn('title')}>{item.title}</div>
      <div className={cn('price')}>{`${item.price.toLocaleString(
        'ru-RU'
      )} ₽`}</div>
      <div className={cn('actions')}>
        <button onClick={() => callbacks.onAddItemToBin(item.code)}>
          Добавить
        </button>
      </div>
    </div>
  );
}

Item.propTypes = {
  item: propTypes.object.isRequired,
  onAddItemToBin: propTypes.func.isRequired,
};

export default React.memo(Item);
