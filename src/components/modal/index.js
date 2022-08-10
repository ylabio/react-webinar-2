import React, { useEffect, useCallback, useState } from 'react';
import propTypes from 'prop-types';
import List from "../list"
import { cn as bem } from "@bem-react/classname";
import './style.css';

function Modal({
  items,
  basketItems,
  isModalActive,
  onModalTogge,
  onRemoveItemFromBasket
}) {
  const cn = bem('Modal');

  // Цена за все товары
  const [totalPriceGoods, setTotalPriceGoods] = useState(0);

  useEffect(() => {
    const totalPrice = basketItems.reduce((sum, item) => {
      return sum + item.price;
    }, 0);
    setTotalPriceGoods(totalPrice);
  }, [basketItems]);

  useEffect(() => {

  }, [items]);

  const callbacks = {
    onModalTogge: useCallback(() => {
      onModalTogge();
    }, [isModalActive]),
  };

  return (
    <div className={cn()} style={{ display: isModalActive ? 'block' : 'none' }}>
      <div
        className={cn('modalWindow')}
        style={{ overflow: (items.length > 6) ? "scroll" : 'visible' }}
      >
        <div className={cn('head')}>
          <p>Корзина</p>
          <button
            className={cn('button')}
            onClick={callbacks.onModalTogge}
          >Закрыть</button>
        </div>
        <List
          items={items}
          basketItems={basketItems}
          isModalActive={isModalActive}
          onModalTogge={onModalTogge}
          onRemoveItemFromBasket={onRemoveItemFromBasket}
        ></List>
        {basketItems.length ? <div className={cn('total')}>
          <div className={cn('totalText')}>Итого</div>
          <div className={cn('totalPrice')}>{Intl.NumberFormat().format(totalPriceGoods)}&nbsp;₽</div>
        </div> : <div className={cn('emptyBasketMessage')}>Корзина пуста</div>}
      </div>
    </div>
  )
}

List.propTypes = {
  items: propTypes.arrayOf(propTypes.object).isRequired, // Обязательное свойство - массив уникальных товаров в корзие
  basketItems: propTypes.arrayOf(propTypes.object).isRequired, // Обязательное свойство - массив всех товаров в корзие
  isModalActive: propTypes.bool, // Обязательное свойство - флаг модального окна
  onModalTogge: propTypes.func, // Обязательное свойство - функция переключения флаг модального окна
  onRemoveItemFromBasket: propTypes.func, // Обязательное свойство - функция удаления товара из корзины
}

List.defaultProps = {
  items: [],
  basketItems: [],
  isModalActive: false,
  onModalTogge: () => { },
  onRemoveItemFromBasket: () => { },
}

export default React.memo(Modal);