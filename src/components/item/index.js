import React, { useCallback } from 'react';
import propTypes from 'prop-types';
import { cn as bem } from "@bem-react/classname";
import './style.css';

function Item({
  item,
  isModalActive,
  addItemToBasket,
  onRemoveItemFromBasket,
}) {
  const cn = bem('Item');

  const callbacks = {
    addItemToBasket: useCallback(() => {
      addItemToBasket(item.code);
    }, []),

    onRemoveItemFromBasket: useCallback(() => {
      onRemoveItemFromBasket(item.code);
    }, []),
  };

  return (
    <div className={cn()}>
      <div className={cn('number')}>
        {item.code}
      </div>
      <div className={cn('title')}>
        {item.title}
      </div>
      <div className={cn('price')}
        style={{ marginRight: isModalActive ? '55px' : '17px' }}
      >
        {Intl.NumberFormat().format(item.price)}&nbsp;₽
      </div>
      {isModalActive && <div className={cn('amount')}>
        {item.quantity}&nbsp;шт
      </div>}
      <div className={cn('actions')}>
        <button
          onClick={isModalActive ? callbacks.onRemoveItemFromBasket : callbacks.addItemToBasket}>
          {isModalActive ? 'Удалить' : 'Добавить'}
        </button>
      </div>
    </div>
  )
}

Item.propTypes = {
  item: propTypes.object.isRequired, // Обязательное свойство - объект товара
  isModalActive: propTypes.bool,  // Обязательное свойство - флаг модального окна
  addItemToBasket: propTypes.func, // Обязательное свойство - функция добавления товара в корзину
  onRemoveItemFromBasket: propTypes.func, // Обязательное свойство - функция удаления товара из корзины по его коду
}

Item.defaultProps = {
  item: {},
  isModalActive: false,
  addItemToBasket: () => { },
  onRemoveItemFromBasket: () => { },
}

export default React.memo(Item);
