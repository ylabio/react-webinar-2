import React from 'react';
import propTypes from 'prop-types';
import './style.css';
import plural from "plural-ru";
import {cn as bem} from "@bem-react/classname";

function Controls(props){

    const cn = bem('Controls');


  return (
    <div className={cn()}>
      <span className={cn('cart')}>{'В корзине: '}</span>
        {props.items.length === 0 ?  <span className={cn("empty")}>пусто</span>
            : <span className={cn('sum')}>{`${props.totalCount}
            ${plural((props.totalCount), ' товар', ' товара', ' товаров')}
            / ${props.totalPrice.toLocaleString('ru-RU')} ₽
        `}</span> }
      <button onClick={props.onOpen}>Перейти</button>
    </div>
  )
}

Controls.propTypes = {
  onOpen: propTypes.func.isRequired, // Обязательное свойство - функция
}

Controls.defaultProps = {
    onOpen: () => {}, // Значение по умолчанию - функция-заглушка
    items: [],
    totalCount: 0,
    totalPrice: 0,
}

export default React.memo(Controls);
