import React, {useCallback, useState} from 'react';
import propTypes from 'prop-types';
import {cn as bem} from "@bem-react/classname";
import './style.css';

function Item(props) {
  const cn = bem('Item');

  const callbacks = {
    onAddToCart: useCallback((e) => {
      e.stopPropagation();
      props.addToCart(props.item.code)
    }, [props.addToCart,  props.item])
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
        {props.item.price.toLocaleString('ru')} ₽
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
  addToCart: propTypes.func.isRequired
}

Item.defaultProps = {
  addToCart: () => {}
}

export default React.memo(Item);
