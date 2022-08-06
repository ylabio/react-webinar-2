import React, {useState} from 'react';
import propTypes from 'prop-types';
import './style.css';
import {cn as bem} from '@bem-react/classname';
import plural from "plural-ru";
import {getAllCartItemsCost} from "../../utils";

function Controls({ cartItems, toggleCart }) {
  const cn = bem('Controls');

  return (
    <div className={cn()}>
      <div className={cn("description")}>
        В корзине:
        <strong className={cn("description-strong")}>
          {!cartItems.length ? 'пусто' : `${plural(cartItems.length, "%d товар", "%d товара", "%d товаров")} / ${getAllCartItemsCost(cartItems).toLocaleString('ru')} ₽`}
        </strong>
      </div>
      <button onClick={toggleCart}>Перейти</button>
    </div>
  )
}

Controls.propTypes = {
  toggleCart: propTypes.func,
  cartItems: propTypes.arrayOf(propTypes.object).isRequired,
}

Controls.defaultProps = {
  toggleCart: () => {},
  cartItems: [],
}

export default React.memo(Controls);
