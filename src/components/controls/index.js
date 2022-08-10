import { cn as bem } from "@bem-react/classname";
import plural from 'plural-ru';
import propTypes from 'prop-types';
import React from 'react';
import './style.css';

function Controls(props){
  const cn = bem('Controls');

  return (
    <div className={cn()}>
      <div className={cn('label')}>В корзине:{'\t'}
        <b> {
          props.goods
            ?
            props.goods + ' ' +
              plural(props.goods, 'товар', 'товара', 'товаров') +
              ' / ' + props.price.toLocaleString('ru-RU') + ' ₽'
            :
              'пусто'
        } </b>
      </div>
      <button onClick={props.onButtonClick} className={cn('showBasket')}>Перейти</button>
    </div>
  )
}

Controls.propTypes = {
  onButtonClick: propTypes.func.isRequired, // Обязательное свойство - функция
  goods: propTypes.number,
  price: propTypes.number
}

Controls.defaultProps = {
  onButtonClick: () => {}, // Значение по умолчанию - функция-заглушка
  goods: 0,
  price: 0
}

export default React.memo(Controls);
