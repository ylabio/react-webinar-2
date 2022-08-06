import React from 'react';
import propTypes from 'prop-types';
import {cn as bem} from "@bem-react/classname";
import plural from 'plural-ru';
import './style.css';

function Controls(props){

  const cn = bem('Controls');

  let counterItems = 0;
  let counterTotalPrice = 0;

  if (Array.isArray(props.card)) {
    counterItems = props.card.length;
    props.card.forEach((card) => {
      counterTotalPrice += (card.price * card.count);
    });
  }
  return (
    <div className={cn()}>
      <div className={cn('total')}>
        <span className={cn('text',{'':'normal'})}>
          В корзине:  
        </span>
        <span className={cn('text',{'':'bold'})}>
          {counterItems? `${counterItems} `+
          `${plural(counterItems, 'товар', 'товара', 'товаров')} / `+
          counterTotalPrice.toLocaleString()+
          ' ₽': 'пусто'}
        </span>
      </div>
      <div className={cn('open')}>
        <button onClick={() => props.openCard(true)}>Перейти</button>
      </div>
    </div>
  )
}

Controls.propTypes = {
  card: propTypes.arrayOf(propTypes.object).isRequired,
  openCard: propTypes.func.isRequired
}

Controls.defaultProps = {
  card: [],
  openCard: () => {}
}

export default React.memo(Controls);
