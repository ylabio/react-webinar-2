import React from 'react';
import propTypes from 'prop-types';
import {cn as bem} from "@bem-react/classname";
import plural from 'plural-ru';
import './style.css';

function Controls(props){

  const cn = bem('Controls');

  return (
    <div className={cn()}>
      <div className={cn('total')}>
        <span className={cn('text',{'':'normal'})}>
          В корзине:  
        </span>
        <span className={cn('text',{'':'bold'})}>
          {props.counterItems? `${props.counterItems} `+
          `${plural(props.counterItems, 'товар', 'товара', 'товаров')} / `+
          props.counterTotalPrice.toLocaleString()+
          ' ₽': 'пусто'}
        </span>
      </div>
      <div className={cn('open')}>
        <button onClick={() => props.openCart(true)}>Перейти</button>
      </div>
    </div>
  )
}

Controls.propTypes = {
  counterItems: propTypes.number.isRequired,
  counterTotalPrice: propTypes.number.isRequired,
  cart: propTypes.arrayOf(propTypes.object).isRequired,
  openCart: propTypes.func.isRequired
}

Controls.defaultProps = {
}

export default React.memo(Controls);
