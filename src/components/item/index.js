import React, { useCallback, useState } from 'react';
import propTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import plural from 'plural-ru';
import './style.css';
import Store from '../../store';

function Item({ item, addCart }) {
  const cn = bem('Item');

  return (
    <div className={cn({ selected: item.selected })}>
      <div className={cn('number')}>{item.code}</div>
      <div className={cn('title')}>{item.title}</div>
      <div className={cn('price')}>{item.price} ₽</div>
      <div className={cn('actions')}>
        <button onClick={() => addCart(item.code, item)}>Добавить</button>
      </div>
    </div>
  );
}

export default React.memo(Item);
