import React from 'react';
import propTypes from 'prop-types';
import plural from 'plural-ru';
import { prettify } from './../../utils';
import { cn as bem } from "@bem-react/classname";
import './style.css';

function Controls({ openModal, itemsInCart, totalPrice }) {
  const cn = bem('Controls');

  return (
    <div className={cn()}>
      В корзине:
      <span className={cn('info')}>
        {itemsInCart ?
          `${plural(itemsInCart, '%d товар', '%d товара', '%d товаров')} / ${prettify(totalPrice)} ₽` :
          'пусто'}
      </span>
      <button className={cn('btn')} onClick={openModal}>Перейти</button>
    </div>
  )
}

Controls.propTypes = {
  openModal: propTypes.func.isRequired,
  itemsInCart: propTypes.number.isRequired,
  totalPrice: propTypes.number.isRequired,
}

Controls.defaultProps = {
  openModal: () => { },
  itemsInCart: 0,
  totalPrice: 0
}

export default React.memo(Controls);
