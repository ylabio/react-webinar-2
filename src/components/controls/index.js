import React from 'react';
import propTypes from 'prop-types';
import './style.css';
import plural from 'plural-ru';
import {cn as bem} from "@bem-react/classname";

function Controls({onCartOpen, getCartState}){
  const cn = bem('Controls');
  return (
    <div className={cn()}>
      <div className={cn('state')}>
        В корзине: <strong>{getCartState().count ? `${getCartState().count} ${plural(getCartState().count, 'товар', 'товара', 'товаров')} / ${getCartState().priceSum} ₽` : `пусто`}</strong>
      </div>
      <div className={cn('btns')}>
        <button onClick={onCartOpen}>Перейти</button>
      </div>
    </div>
  )
}

Controls.propTypes = {
  onCartOpen: propTypes.func.isRequired, // Обяхательное свойство - функция
  getCartState: propTypes.func.isRequired
}

Controls.defaultProps = {
  onCartOpen: () => {}, // Значение по умолчанию - функция-заглушка
  getCartState: () => {}
}

export default React.memo(Controls);
