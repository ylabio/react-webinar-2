import React from 'react';
import propTypes from 'prop-types';
import './style.css';
import {cn as bem} from '@bem-react/classname';
import { getAllPrice, toPlural } from "../../utils";

function Controls({ cartItems, toggleCart }) {
  const cn = bem('Controls');

  return (
    <div className={cn()}>
      <div className={cn("description")}>
        В корзине:
        <strong className={cn("description-strong")}>
          {!cartItems.length
            ? 'пусто'
            : `${toPlural(cartItems.length,"товар","товара","товаров")} / ${getAllPrice(cartItems)}`}
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
