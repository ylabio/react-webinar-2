import React, {useCallback} from 'react';
import propTypes from 'prop-types';
import {cn as bem} from "@bem-react/classname";
import './style.css';

function ItemCart(props) {
  const cn = bem('Item');

  const callbacks = {
    onDeleted: useCallback((e) => {
      e.stopPropagation();
      props.onDeleted(props.item)
    }, [props.onDeleted, props.item])
  };

  return (
    <div className={cn({'selected': props.item.selected})} onClick={callbacks.onClick}>
      <div className={cn('number')}>
        {props.item.code}
      </div>
      <div className={cn('title')}>
        {props.item.title}
      </div>
      <div className={cn('actions')}>
        <div className={cn('price')}>
          {props.item.price.toLocaleString('ru-RU')} ₽
        </div>
        <div className={cn('price')}>
          {props.item.cartCount} шт
        </div>
        <button onClick={callbacks.onDeleted}>
          Удалить
        </button>
      </div>
    </div>
  )
}

ItemCart.propTypes = {
  item: propTypes.object.isRequired,
  onDeleted: propTypes.func.isRequired
}

ItemCart.defaultProps = {}

export default React.memo(ItemCart);
