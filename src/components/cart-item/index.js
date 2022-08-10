import React, {useCallback} from 'react';
import propTypes from 'prop-types';
import {cn as bem} from "@bem-react/classname";
import './style.css';

/**
 * Элемент списка товаров корзины
 * @param props Передаваемые пропсы
 * @return {React.ReactElement} Виртуальные элементы React
 */
function CartItem(props) {
  const cn = bem('CartItem');

  const callbacks = {
    onClick: useCallback((event) => {
      event.stopPropagation();
      props.onDeleteCartItem(props.item.code);
    }, [props.onDeleteCartItem, props.item]),

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
        {props.item.price.toLocaleString('ru-RU')} ₽
      </div>
      {props.item.amount &&
        <div className={cn('amount')}>
          {props.item.amount} шт
        </div>
      }
      <div className={cn('actions')}>
        <button className={cn('btn')} onClick={callbacks.onClick}>
          Удалить
        </button>
      </div>
    </div>
  )
}

CartItem.propTypes = {
  item: propTypes.object.isRequired,
  onDeleteCartItem: propTypes.func.isRequired,
}

CartItem.defaultProps = {
}

export default React.memo(CartItem);
