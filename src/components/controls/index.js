import React from 'react';
import propTypes from 'prop-types';
import './style.css';
import plural from 'plural-ru'
function Controls({ priceProduct, amountProduct, setActive }) {
  return (
    <div className='Controls'>
      <div className='Info_wrapper_items'>
        <p className='Basket_title'>В корзине:</p>
        <p className='Product_amount_price'>{`${amountProduct > 0 ? plural(amountProduct, '%d товар', '%d товара', '%d товаров') + ' / ' + priceProduct.toLocaleString() + ' ₽' : 'пусто'}  `}</p>
      </div>
      <div className='Wrapper_bth'>
        <button onClick={() => setActive(true)}>Перейти</button>
      </div>
    </div>
  )
}

Controls.propTypes = {

  setActive: propTypes.func.isRequired,
  priceProduct: propTypes.number.isRequired,
  amountProduct: propTypes.number.isRequired,
}



export default React.memo(Controls);
