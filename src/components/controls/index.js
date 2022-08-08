import React from 'react';
import propTypes from 'prop-types';
import plural from 'plural-ru';
import { prettify } from './../../utils';
import './style.css';

function Controls({ openModal, cart, totalPrice }) {

  return (
    <div className='Controls'>
      В корзине:
      <span className='Controls-info'>
        {cart.length ?
          `${plural(cart.length, '%d товар', '%d товара', '%d товаров')} / ${prettify(totalPrice)} ₽` :
          'пусто'}
      </span>
      <button className='Controls-btn' onClick={openModal}>Перейти</button>
    </div>
  )
}

Controls.propTypes = {
  openModal: propTypes.func.isRequired // Обяхательное свойство - функция
}

Controls.defaultProps = {
  openModal: () => { } // Значение по умолчанию - функция-заглушка
}

export default React.memo(Controls);
