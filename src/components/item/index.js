import React, {useCallback, useState} from 'react';
import propTypes from 'prop-types';
import {cn as bem} from "@bem-react/classname";
import './style.css';
import { currencyFormat } from '../../utils';

function Item({item, onAddToCart}) {
  const cn = bem('Item');

  const callbacks = {
    onAddToCart: useCallback((e) => {
      e.stopPropagation();
      onAddToCart(item.code)
    }, [onAddToCart,  item])
  };

  const modifiedPrice = currencyFormat(item.price, 0);

  return (
    <div className={cn()} >
      <div className={cn('number')}>
        {item.code}
      </div>
      <div className={cn('title')}>
         {item.title}   
      </div>
      <div className={cn('price')}>
        {modifiedPrice}
      </div>   
      <div className={cn('actions')}>
        <button onClick={callbacks.onAddToCart}>
          Добавить
        </button>
      </div>
    </div>
  )
}

Item.propTypes = {
  item: propTypes.object.isRequired,
  onSelect: propTypes.func.isRequired,
  onDeleted: propTypes.func.isRequired
}

Item.defaultProps = {
  onSelect: () => {},
  onDeleted: () => {}
}

export default React.memo(Item);
