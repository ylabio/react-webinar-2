import React from 'react';
import propTypes from 'prop-types';
import List from "../list"
import { cn as bem } from "@bem-react/classname";
import './style.css';

function BasketFinalPrice({
  totalPriceGoodsInBasket,
  amountOfUniqueGoodsInBasket
}) {
  const cn = bem('TotalPrice');

  return (
    amountOfUniqueGoodsInBasket ? <div className={cn()} >
      <div className={cn('text')}>Итого</div>
      <div className={cn('price')}>{Intl.NumberFormat().format(totalPriceGoodsInBasket)}&nbsp;₽</div>
    </div> : <div className={cn('emptyBasketMessage')}>Корзина пуста</div>
  )
}

List.propTypes = {
  totalPriceGoodsInBasket: propTypes.number, //Обязательное свойство - общая цена  товаров в корзие
  amountOfUniqueGoodsInBasket: propTypes.number //Обязательное свойство - число уникальных товаров в корзие
}

List.defaultProps = {
}

export default React.memo(BasketFinalPrice);