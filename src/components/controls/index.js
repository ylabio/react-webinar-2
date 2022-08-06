import React, {useCallback} from 'react';
import propTypes from 'prop-types';
import plural from 'plural-ru';
import './style.css';
import {cn as bem} from "@bem-react/classname";

function Controls({cart, onCartOpen}){
  const cn = bem('Controls');
  const amount = Object.keys(cart.items).length;

  const callbacks = {
    onCartOpen: useCallback(() => {
      onCartOpen()
    }, [])
  };

  return (
    <div className='Controls'>
      <div className={cn('info')}>В корзине: {amount ?
        <b>{amount} {plural(amount, 'товар', 'товара', 'товаров')} / {cart.total} &#8381;</b> :
        <b>пусто</b>}
      </div>
      <button className={cn('button')} onClick={callbacks.onCartOpen}>Перейти</button>
    </div>
  )
}

Controls.propTypes = {
  cart: propTypes.object.isRequired,
  onCartOpen: propTypes.func.isRequired // Обязательное свойство - функция
}

export default React.memo(Controls);
