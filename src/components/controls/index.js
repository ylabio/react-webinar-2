import React from 'react';
import propTypes from 'prop-types';
import plural from 'plural-ru';
import './style.css';
import {getSumPrice} from '../../utils';
import {cn as bem} from "@bem-react/classname";

function Controls(props) {
  const cn = bem('Controls');
  const numberOfPositions = props.items.length;

  return (
    <div className={cn()}>
      <p className={cn('basket-block')}><span className={cn('text')}>В корзине:</span> <span className={cn('products-sum')}>{props.items.length > 0
          ? `${numberOfPositions} ${plural(numberOfPositions, 'товар', 'товара', 'товаров')} / ${getSumPrice(props.items)} ₽`
          : 'пусто'}</span></p>
      <button onClick={props.onBasketPopupShow}>Перейти</button>
    </div>
  )
}

Controls.propTypes = {
  items: propTypes.arrayOf(propTypes.object).isRequired,
  onBasketPopupShow: propTypes.func.isRequired, // Обязательное свойство - функция
}

Controls.defaultProps = {
  items: [],
}

export default React.memo(Controls);
