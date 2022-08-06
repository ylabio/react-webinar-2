import React from 'react';
import propTypes from 'prop-types';
import './style.css';
import plural from 'plural-ru'
import {cn as bem} from '@bem-react/classname';

function Controls(props){
  const cn = bem('Controls');

  const totalQty = props.cart.length;
  const totalPrice = props.cart.reduce((x,y)=> x + (y.price * y.qty),0);

  return (
    <div className={cn()}>
      <span>В корзине:</span>
      <span className={cn('info')}>
        {`${totalQty} ${plural('товар','товара', 'товаров')} / ${(totalPrice).toLocaleString('ru-RU',{style:'currency', currency:'RUB',maximumFractionDigits: 0})}`}</span>
      <div className={cn('actions')}>
        <button onClick={()=>props.callModal(true)} >Перейти</button>
      </div>
    </div>
  )
}

Controls.propTypes = {
  cart: propTypes.arrayOf(propTypes.object).isRequired,
  callModal: propTypes.func.isRequired // Обяхательное свойство - функция
}

Controls.defaultProps = {
  cart: [],
  callModal: () => {} // Значение по умолчанию - функция-заглушка
}

export default React.memo(Controls);
