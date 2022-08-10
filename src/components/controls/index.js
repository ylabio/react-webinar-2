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
        {props.amountUnique ?
          `${props.amountUnique} ${plural(props.amountUnique, 'товар', 'товара', 'товаров')} / 
          ${props.sumInCart.toLocaleString('ru')} ₽`
          : 'пусто'}
      </span>
      <button onClick={props.handleShowModal}>Перейти</button>
    </div>
  )
}

Controls.propTypes = {
  handleShowModal: propTypes.func,
  sumInCart: propTypes.number,
  amountUnique: propTypes.number,
}

Controls.defaultProps = {
  handleShowModal: () => {},
  sumInCart: 0,
  amountUnique: 0,
}

export default React.memo(Controls);
