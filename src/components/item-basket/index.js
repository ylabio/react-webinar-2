import React, { useCallback } from "react";
import propTypes from 'prop-types';
import {cn as bem} from "@bem-react/classname";
import './style.css';

function ItemBasket({item, deleteItem}) {
  const cn = bem('ItemBasket');
  const callbacks = {
    deleteItem: useCallback(() => {
      deleteItem(item.code);
      }, [deleteItem, item]),
  };
 
  return (
    <div className={cn()}>
      <div className={cn('number')}>
        {item.code}
      </div>
      <div className={cn('title')}>
        {item.title}
      </div>
      <div className={cn('price-num')}>
        <div className={cn('price')}>
          {`${item.price.toLocaleString('ru')} ₽`}
        </div>
        <div className={cn('num')}>
          {item.num} шт
        </div>
      </div>
      <div className={cn('num-button')}>
        <button onClick={()=>callbacks.deleteItem(item.code)}>
          Удалить
        </button>
      </div>
    </div>
  )
}

ItemBasket.propTypes = {
  item: propTypes.object.isRequired,
  deleteItem: propTypes.func.isRequired
}

export default React.memo(ItemBasket);
