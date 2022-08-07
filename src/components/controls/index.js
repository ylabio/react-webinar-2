import React from 'react';
import propTypes from 'prop-types';
import './style.css';
import {cn as bem} from "@bem-react/classname";
import plural from "plural-ru";
import {numberFormat} from "../../utils/numbers";

function Controls(props){
  const cn = bem('Controls');
  return (
    <div className={cn()}>
      <span className={cn('title')}>В корзине: </span>
      <span className={cn('total')}>
                {props.amount
                    ? `${props.amount} ${plural(props.amount, 'товар', 'товара', 'товаров')} 
                    / ${numberFormat(props.price, )} ₽`
                    : 'пусто'}
            </span>
      <button className={cn('btn')} onClick={props.onAdd}>Перейти</button>
    </div>
  )
}

Controls.propTypes = {
  onAdd: propTypes.func.isRequired // Обязательное свойство - функция
}

Controls.defaultProps = {
  onAdd: () => {} // Значение по умолчанию - функция-заглушка
}

export default React.memo(Controls);
