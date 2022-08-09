import React from 'react';
import propTypes from 'prop-types';
import './style.css';
import CartSumm from '../cart-sum/index';
import {cn as bem} from "@bem-react/classname";

function Controls({setModalActive, cart}){
  const cn = bem('Controls');
  return (
    <div className={cn()}>
      <div>В корзине: </div>
      <CartSumm cart={cart} place={'store'}/>
      <div className={cn('Button')}>
      <button onClick={()=>setModalActive(true)}> Перейти </button>
      </div>
    </div>
  )
}

Controls.propTypes = {
  setModalActive: propTypes.func.isRequired,// Обязательное свойство - функция
  cart: propTypes.object.isRequired
}

Controls.defaultProps = {
  setModalActive: () => {} // Значение по умолчанию - функция-заглушка
}

export default React.memo(Controls);
