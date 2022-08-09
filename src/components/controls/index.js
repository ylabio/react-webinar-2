import React from 'react';
import propTypes from 'prop-types';
import './style.css';
import plural from 'plural-ru';
import { numberWithSpaces } from "../../utils";
import { cn as bem } from "@bem-react/classname";

function Controls(props){
  const cn = bem('Controls');
  const numOfGoods = props.cart.map(item => item.quantity).reduce((acc, value) => acc + value, 0);
  const sumOfGoods = props.cart.map(item => item.price * item.quantity).reduce((acc, value) => acc + value, 0);


  return (
    <div className={cn()}>
      <div className={cn('stats')}>
        В корзине:
        <span className={cn('stat')}>
          {numOfGoods ?
            `${numOfGoods} ${plural(numOfGoods,'товар','товара','товаров')} / ${numberWithSpaces(sumOfGoods)} ₽`
            : 'пусто'}
        </span>
      </div>
      <button onClick={props.onToggleModal}>Перейти</button>
    </div>
  )
}

Controls.propTypes = {
  cart: propTypes.arrayOf(propTypes.object).isRequired,
}

Controls.defaultProps = {
  cart: [],
}

export default React.memo(Controls);
