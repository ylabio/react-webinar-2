import React from 'react';
import propTypes from 'prop-types';
import './style.css';
import {pluralProduct} from "../../utils";
import {cn as bem} from "@bem-react/classname";

function Controls({openBasket, amount, sum}) {
  const cn = bem('Controls')
  return (
    <div className={cn()}>
      <div className={cn('title')}>В корзине:</div>
      <div className={cn('info')}>{amount >= 1 ? `${amount} ${pluralProduct(amount)} / ${sum} ₽` : 'пусто'}</div>
      <button onClick={openBasket}>Перейти</button>
    </div>
  )
}

Controls.propTypes = {
  openBasket: propTypes.func.isRequired
}


export default React.memo(Controls);
