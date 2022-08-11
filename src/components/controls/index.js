import React from 'react';
import propTypes from 'prop-types';
import plural from 'plural-ru';
import './style.css';
import {cn as bem} from "@bem-react/classname";

function Controls({numberOfPositions, onBasketPopupShow, sumPrice}) {
  const cn = bem('Controls');

  return (
    <div className={cn()}>
      <p className={cn('basket-block')}><span className={cn('text')}>В корзине:</span> <span className={cn('products-sum')}>{numberOfPositions > 0
          ? `${numberOfPositions} ${plural(numberOfPositions, 'товар', 'товара', 'товаров')} / ${sumPrice} ₽`
          : 'пусто'}</span></p>
      <button onClick={onBasketPopupShow}>Перейти</button>
    </div>
  )
}

Controls.propTypes = {
  onBasketPopupShow: propTypes.func.isRequired, // Обязательное свойство - функция
  sumPrice: propTypes.string.isRequired,
  numberOfPositions: propTypes.number.isRequired,
}

export default React.memo(Controls);
