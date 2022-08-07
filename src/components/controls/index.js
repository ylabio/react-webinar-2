import React from 'react';
import plural from 'plural-ru'
import propTypes from 'prop-types';
import {cn as bem} from "@bem-react/classname";
import './style.css';

function Controls(props){
  const cn = bem('Controls');

  return (
    <div className={cn()}>
      <div className={cn('info')}>
        В корзине:
        {props.cartItemsLength
          ? <b>{`${props.cartItemsLength} 
              ${plural(props.cartItemsLength, 'товар', 'товара', 'товаров')} 
              / ${props.totalPrice.toLocaleString('ru')} ₽`}
            </b>
          : <b>пусто</b>}
      </div> 
      <button onClick={props.isCartOpened}>Перейти</button>
    </div>
  )
}

Controls.propTypes = {
  totalPrice: propTypes.number,
  cartItemsLength: propTypes.number,
  isCartOpened: propTypes.func // Обяхательное свойство - функция
}

Controls.defaultProps = {
  totalPrice: 0,
  cartItemsLength: 0,
  isCartOpened: () => {} // Значение по умолчанию - функция-заглушка
}

export default React.memo(Controls);
