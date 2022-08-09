import React from 'react';
import propTypes from 'prop-types';
import plural from 'plural-ru';
import { prettify } from './../../utils';
import { cn as bem } from "@bem-react/classname";
import './style.css';

function Controls({ openModal, cart, totalPrice }) {
  const cn = bem('Controls');

  return (
    <div className={cn()}>
      В корзине:
      <span className={cn('info')}>
        {cart.length ?
          `${plural(cart.length, '%d товар', '%d товара', '%d товаров')} / ${prettify(totalPrice)} ₽` :
          'пусто'}
      </span>
      <button className={cn('btn')} onClick={openModal}>Перейти</button>
    </div>
  )
}

Controls.propTypes = {
  openModal: propTypes.func.isRequired,
  cart: propTypes.array.isRequired,
  totalPrice: propTypes.number.isRequired,
}

Controls.defaultProps = {
  openModal: () => { },
  cart: [],
  totalPrice: 0
}

export default React.memo(Controls);
