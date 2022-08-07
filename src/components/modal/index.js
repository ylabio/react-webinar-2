import React from 'react';
import propTypes from 'prop-types';
import {cn as bem} from "@bem-react/classname";
import './style.css';
import CartList from '../cart-list/index';

function Modal({cart, active, setActive, onDeteleCart}) {
  const cn = bem('Modal');
  
  return (

    <div className={cn('overlay', {active:active})}>
      <div className={cn('cross')}>
        <div className={cn('head')}>
          <h1>Корзина</h1>
          <div className={cn('action')}><button onClick={()=>setActive(false)}>Закрыть</button></div>
        </div>
        <div className={cn('content')}>
          <CartList cart={cart} onDeteleCart={onDeteleCart}/>
        </div>
      </div>

    </div>
    
  )
}

 

Modal.propTypes = {
  active:propTypes.bool.isRequired,
}

export default React.memo(Modal);