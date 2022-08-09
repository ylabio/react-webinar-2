import React, { useCallback, useEffect, useState } from 'react';
import propTypes from 'prop-types';
import { cn as bem } from "@bem-react/classname";
import './style.css';

function Item(props) {
  const cn = bem('Item');

  // Количество определенного товара
  const [countGoods, setCountGoods] = useState(0);

  useEffect(() => {
    const number = props.basketItems.filter(item => item.code === props.item.code).length
    setCountGoods(number);
  }, [props.basketItems]);

  const callbacks = {
    addItemToBasket: useCallback(() => {
      props.addItemToBasket(props.item.code);
    }, [props.item.code]),

    onRemoveItemFromBasket: useCallback(() => {
      props.onRemoveItemFromBasket(props.item.code);
    }, [props.item.code]),
  };

  return (
    <div className={cn()}>
      <div className={cn('number')}>
        {props.item.code}
      </div>
      <div className={cn('title')}>
        {props.item.title}
      </div>
      <div className={cn('price')}
        style={{ marginRight: props.isModalActive ? '55px' : '17px' }}
      >
        {Intl.NumberFormat().format(props.item.price)}&nbsp;₽
      </div>
      {props.isModalActive && <div className={cn('amount')}>
        {countGoods}&nbsp;шт
      </div>}
      <div className={cn('actions')}>
        <button
          onClick={props.isModalActive ? callbacks.onRemoveItemFromBasket : callbacks.addItemToBasket}>
          {props.isModalActive ? 'Удалить' : 'Добавить'}
        </button>
      </div>
    </div>
  )
}

Item.propTypes = {
  item: propTypes.object.isRequired, // Обязательное свойство - объект товара
  basketItems: propTypes.arrayOf(propTypes.object).isRequired, // Обязательное свойство - массив всех товаров в корзие
  isModalActive: propTypes.bool,  // Обязательное свойство - флаг модального окна
  addItemToBasket: propTypes.func, // Обязательное свойство - функция добавления товара в корзину
  onModalTogge: propTypes.func,  // Обязательное свойство - функция переключения флаг модального окна
  onRemoveItemFromBasket: propTypes.func, // Обязательное свойство - функция удаления товара из корзины по его коду
}

Item.defaultProps = {
  item: {},
  basketItems: [],
  isModalActive: false,
  addItemToBasket: () => { },
  onModalTogge: () => { },
  onRemoveItemFromBasket: () => { },
}

export default React.memo(Item);
