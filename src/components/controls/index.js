import React from 'react';
import propTypes from 'prop-types';
import './style.css';
const plural = require('plural-ru');
import {cn as bem} from "@bem-react/classname";

function Controls({openBasket, amount, sum}) {
  const cn = bem('Controls')
  return (
    <div className={cn()}>
      <div className={cn('title')}>В корзине:</div>
      <div className={cn('info')}>{amount >= 1 ? `${amount} ${plural(amount,'товар','товара','товаров')} / ${sum.toLocaleString('ru')} ₽` : 'пусто'}</div>
      <button onClick={openBasket}>Перейти</button>
    </div>
  )
}

Controls.propTypes = {
  openBasket: propTypes.func,
  amount:propTypes.number,
  sum:propTypes.number

}

Controls.defaultProps = {
  amount:0,
  sum:0
}



export default React.memo(Controls);
