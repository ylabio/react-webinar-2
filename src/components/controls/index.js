import React from 'react';
import propTypes from 'prop-types';
import './style.css';
import plural from 'plural-ru';
import { getFullCostOfCart } from '../../utils';

function Controls({cart , changeShowModal}){
  return (
    <div className='Controls'>
      <span>В корзине:</span>
      <span className='cart-count'>{cart.length ? `${cart.length} ${plural(cart.length , 'товар' , 'товара' , 'товаров')} / ${getFullCostOfCart(cart).toLocaleString('ru-RU') + " ₽"}` : 'пусто'}</span>
      <button className='open-modal-btn' onClick={() => changeShowModal()}>Перейти</button>
    </div>
  )
}

Controls.propTypes = {
  cart: propTypes.array.isRequired ,
  changeShowModal: propTypes.func.isRequired
}

Controls.defaultProps = {
  cart: []
}

export default React.memo(Controls);
