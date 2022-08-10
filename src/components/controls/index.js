import React, { useCallback } from 'react';
import propTypes from 'prop-types';
import { cn as bem } from "@bem-react/classname";
import plural from 'plural-ru';
import './style.css';

function Controls({
  amountOfUniqueGoodsInBasket,
  totalPriceGoodsInBasket,
  onModalTogge
}) {
  const cn = bem('Controls');

  const callbacks = {
    onClick: useCallback(() => {
      onModalTogge();
    }, []),
  }

  return (
    <div className={cn()}>
      <div className={cn("title")}>
        <div className={cn("titleText")}>В корзине: </div>
        <div className={cn("basketInfo")}>
          {amountOfUniqueGoodsInBasket > 0 ?
            `${amountOfUniqueGoodsInBasket} ${plural(amountOfUniqueGoodsInBasket, 'товар', 'товара', 'товаров')} / ${Intl.NumberFormat().format(totalPriceGoodsInBasket)} ₽` : 'пусто'}
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
  amountOfUniqueGoodsInBasket: propTypes.number.isRequired, // Обязательное свойство - количество уникального товара в корзине в корзие
  totalPriceGoodsInBasket: propTypes.number.isRequired, // Обязательное свойство - итоговая ццена всех товаров в корзине
  onModalTogge: propTypes.func.isRequired, //  Обязательное свойство - функция переключения флага модального окна
}

Controls.defaultProps = {
  onModalTogge: () => { },
}

export default React.memo(Controls);
