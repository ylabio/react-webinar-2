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
        {props.totalCount
          ? <b>{`${props.totalCount} 
              ${plural(props.totalCount, 'товар', 'товара', 'товаров')} 
              / ${props.totalPrice.toLocaleString('ru')} ₽`}
            </b>
          : <b>пусто</b>}
      </div> 
      <button onClick={props.isModalOpened}>Перейти</button>
    </div>
  )
}

Controls.propTypes = {
  totalPrice: propTypes.number,
  totalCount: propTypes.number,
  isModalOpened: propTypes.func // Обязательное свойство - функция
}

Controls.defaultProps = {
  totalPrice: 0,
  totalCount: 0,
  isModalOpened: () => {} // Значение по умолчанию - функция-заглушка
}

export default React.memo(Controls);
