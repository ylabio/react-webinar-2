import React from 'react';
import propTypes from 'prop-types';
import './style.css';
import {sumCalculated} from "../../utils";

function Controls({setIsModalActive,cartItems}) {
  return (
    <div className='Controls'>
      <span className='Controls-text'>В корзине:</span>
      <span className='Controls-itemCount'>2 товара / {cartItems} ₽</span>
      <button onClick={() => setIsModalActive(true)}>Перейти</button>
    </div>
  )
}

Controls.propTypes = {
}

Controls.defaultProps = {
}

export default React.memo(Controls);
