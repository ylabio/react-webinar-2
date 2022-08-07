import React from 'react';
import propTypes from 'prop-types';
import {cn as bem} from "@bem-react/classname";
import plural from 'plural-ru';
import './style.css';

function Controls(props){

  const cn = bem('Controls');

  return (
    <div className={cn('')}>
      <span>В корзине:</span>
      <span className={cn('cart-info')}>
        {props.cart.length ?
          `${props.cart.length} ${plural(props.cart.length, 'товар', 'товара', 'товаров')} / 
          ${props.sumInCart.toLocaleString('ru')} ₽`
          : 'пусто'}
      </span>
      <button onClick={props.handleShowModal}>Перейти</button>
    </div>
  )
}

Controls.propTypes = {
  cart: propTypes.arrayOf(propTypes.object).isRequired,
  handleShowModal: propTypes.func.isRequired,
  sumInCart: propTypes.number,
}

Controls.defaultProps = {
  cart: [],
  handleShowModal: () => {},
}

export default React.memo(Controls);
