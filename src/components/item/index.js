import React, {useCallback} from 'react';
import propTypes from 'prop-types';
import {cn as bem} from "@bem-react/classname";
import './style.css';

/**
 * Элемент списка товаров
 * @param props Передаваемые пропсы
 * @return {React.ReactElement} Виртуальные элементы React
 */
function Item(props) {
  const cn = bem('Item');

  const callbacks = {
    onClick: useCallback((event) => {
      event.stopPropagation();
      props.onAddItemToCart(props.item.code);
    }, [props.onAddItemToCart, props.item]),

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
          Добавить
        </button>
      </div>
    </div>
  )
}

Item.propTypes = {
  item: propTypes.object.isRequired,
  onAddItemToCart: propTypes.func.isRequired,
}

Item.defaultProps = {}

export default React.memo(Item);
