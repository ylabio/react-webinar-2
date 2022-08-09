import { cn as bem } from "@bem-react/classname";
import plural from 'plural-ru';
import propTypes from 'prop-types';
import React from 'react';
import './style.css';

function Controls(props){
  const cn = bem('Controls');

  return (
    <div className={cn()}>
      <div className={cn('label')}>В Корзине:{'\t'}
        <b> {
          props.stats.goods
            ?
            props.stats.goods + ' ' +
              plural(props.stats.goods, 'товар', 'товара', 'товаров') +
              ' / ' + props.stats.price.toLocaleString('ru-RU') + ' ₽'
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
  stats: propTypes.object.isRequired
}

Controls.defaultProps = {
  onButtonClick: () => {} // Значение по умолчанию - функция-заглушка
}

export default React.memo(Controls);
