import React, {useCallback} from 'react';
import propTypes from 'prop-types';
import {cn as bem} from "@bem-react/classname";
import './style.css';

function ItemCart(props) {
  const cn = bem('ItemCart');

  const callbacks = {
    onDelete: useCallback((e) => {
      e.stopPropagation();
      props.onDelete(props.item)
    }, [props.onDelete,  props.item])
  };

  return (
    <div className={cn({'selected': props.item.selected})}>
      <div className={cn('number')}>
        {props.index}
      </div>
      <div className={cn('title')}>
        {props.item.title}
        <span className={cn('price')}>{props.item.count} шт</span>
        <span className={cn('price')}>{props.item.price.toLocaleString('ru-RU')} ₽</span>
      </div>
      <div className={cn('actions')}>
        <button onClick={callbacks.onDelete}>
          Удалить
        </button>
      </div>
    </div>
  )
}

ItemCart.propTypes = {
  item: propTypes.object.isRequired,
  onDelete: propTypes.func.isRequired
}

ItemCart.defaultProps = {
  onDelete: () => {}
}

export default ItemCart;
