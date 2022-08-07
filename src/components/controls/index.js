import React from 'react';
import propTypes from 'prop-types';
import './style.css';
import { getTotalPrice, getTotalCount } from "../../utils";
import plural from "plural-ru";
import {cn as bem} from "@bem-react/classname";

function Controls(props){

    const cn = bem('Controls');
  return (
    <div className={cn()}>
      <span className={cn('cart')}>{'В корзине: '}</span>
        {props.items ? <span className={cn('sum')}>{`${getTotalCount(props.items)}
            ${plural(getTotalCount(props.items), ' товар', ' товара', ' товаров')}
            / ${getTotalPrice(props.items)} ₽
        `}</span> : <span className={cn("empty")}>пусто</span> }
      <button onClick={props.onOpen}>Перейти</button>
    </div>
  )
}

Controls.propTypes = {
  onOpen: propTypes.func.isRequired, // Обязательное свойство - функция
}

Controls.defaultProps = {
    onOpen: () => {}, // Значение по умолчанию - функция-заглушка
}

export default React.memo(Controls);
