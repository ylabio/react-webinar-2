import React from 'react';
import propTypes from 'prop-types';
import {cn as bem} from "@bem-react/classname";
import plural from 'plural-ru';
import './style.css';

function Controls(props){
  const cn = bem('Controls');

  return (
    <div className={cn()}>
      <div className={cn('cart')}>
        {`В корзине: `}
        <b>{props.amount ? `${props.amount} ${plural(props.amount, 'товар', 'товара', 'товаров')} / ${props.price.toLocaleString()} ₽` : 'пусто'}</b>
      </div>
      <div className={cn('btn')}>
        <button onClick={props.openModal}>Перейти</button>
      </div>
    </div>
  )
}

Controls.propTypes = {
  openModal: propTypes.func.isRequired, // Обязательное свойство - функция
  amount: propTypes.number.isRequired,
  price: propTypes.number.isRequired
}

Controls.defaultProps = {
  openModal: () => {}, // Значение по умолчанию - функция-заглушка
  amount: 0,
  price: 0
}

export default React.memo(Controls);
