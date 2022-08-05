import React from 'react';
import propTypes from 'prop-types';
import './style.css';
import plural from 'plural-ru';
import {cn as bem} from "@bem-react/classname";

function Basket(props){
  const cn = bem('Basket');
  return (
    <div className={cn()}>
      <span className={cn('text')}>В корзине:</span>
      <span className={cn('count')}> {props.count ? `${props.count} ${plural(props.count, 'товар', 'товара', 'товаров')} / ${props.totalSum} ₽` : 'пусто'}</span>
      <button className={cn('button')} onClick={props.onOpenModal}>Перейти</button>
    </div>
  )
}

Basket.propTypes = {
  count: propTypes.number.isRequired,
  totalSum: propTypes.number.isRequired,
  onOpenModal: propTypes.func.isRequired // Обяхательное свойство - функция
}

Basket.defaultProps = {
  onOpenModal: () => {} // Значение по умолчанию - функция-заглушка
}

export default React.memo(Basket);
