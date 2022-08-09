import React, { useEffect, useState, useCallback } from 'react';
import propTypes from 'prop-types';
import { cn as bem } from "@bem-react/classname";
import plural from 'plural-ru';
import './style.css';

function Controls({
  basketItems,
  basketUniqueItems,
  onModalTogge
}) {
  const cn = bem('Controls');

  // Количество уникальных товаров в корзине
  const [countItemsInBasket, setCountItemsInBasket] = useState(0);
  // Общая сумма товаров
  const [totalPriceGoods, setTotalPriceGoods] = useState(0);

  const callbacks = {
    onClick: useCallback(() => {
      onModalTogge();
    }, []),
  }

  useEffect(() => {
    const totalPrice = basketItems.reduce((sum, item) => {
      return sum + item.price;
    }, 0);
    setTotalPriceGoods(totalPrice);
    setCountItemsInBasket(basketUniqueItems.length);
  }, [basketItems]);

  return (
    <div className={cn()}>
      <div className={cn("title")}>
        <div className={cn("titleText")}>В корзине: </div>
        <div className={cn("basketInfo")}>
          {basketItems.length !== 0 ?
            `${countItemsInBasket} ${plural(countItemsInBasket, 'товар', 'товара', 'товаров')} / ${totalPriceGoods} ₽` : 'пусто'}
        </div>
      </div>
      <button
        className={cn("button")}
        onClick={callbacks.onClick}
      >Перейти</button>
    </div >
  )
}

Controls.propTypes = {
  basketItems: propTypes.arrayOf(propTypes.object).isRequired, // Обязательное свойство - массив товаров в корзие
  basketUniqueItems: propTypes.arrayOf(propTypes.object).isRequired,  // Обязательное свойство - массив уникальных товаров в корзие
  onModalTogge: propTypes.func.isRequired, //  Обязательное свойство - функция переключения флага модального окна
}

Controls.defaultProps = {
  basketItems: [],
  basketUniqueItems: [],
  onModalTogge: () => { },
}

export default React.memo(Controls);
