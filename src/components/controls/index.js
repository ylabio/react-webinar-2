import React from 'react';
import propTypes from 'prop-types';
import './style.css';
import plural from 'plural-ru';

function Controls({cart , changeShowModal , cartCost , goodsAmount}){
  return (
    <div className='Controls'>
      <span>В корзине:</span>
      <span className='cart-count'>{cart.length ? `${goodsAmount} ${plural(goodsAmount , 'товар' , 'товара' , 'товаров')} / ${cartCost.toLocaleString('ru-RU') + " ₽"}` : 'пусто'}</span>
      <button className='open-modal-btn' onClick={() => changeShowModal()}>Перейти</button>
    </div>
  )
}

Controls.propTypes = {
  cart: propTypes.array.isRequired ,
  changeShowModal: propTypes.func.isRequired,
  cartCost: propTypes.number.isRequired,
  goodsAmount: propTypes.number.isRequired
}

Controls.defaultProps = {

}

export default React.memo(Controls);
