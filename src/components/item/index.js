import React, {useCallback} from 'react';
import propTypes from 'prop-types';
import {cn as bem} from "@bem-react/classname";
import './style.css';
import {numberWithSpace} from "../../utils";

function Item(props) {
  const cn = bem('Item');

  const callbacks = {
    onAddDeleteToCart: useCallback((e) => {
      e.stopPropagation();
      props.onAddDeleteToCart(props.item)
    }, [props.onAddDeleteToCart, props.item])
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
          {numberWithSpace(props.item.price)} ₽
        </div>
        {props.isCart &&
          <div className={cn('price')}>
            {numberWithSpace(props.item.cartCount)} шт
          </div>
        }
        <button onClick={callbacks.onAddDeleteToCart}>
          {props.isCart ? 'Удалить' : 'Добавить'}
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
  onSelect: () => {
  },
  onDeleted: () => {
  }
}

export default React.memo(Item);
