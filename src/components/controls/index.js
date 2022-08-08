import React from 'react';
import propTypes from 'prop-types';
import {cn as bem} from "@bem-react/classname";
import plural from "plural-ru";
import './style.css';

function Controls({totalCartPrice, totalCartItemsCount, onCartOpen}){
  let cn = bem("Controls");
  return (
    <div className={cn()}>
      <span className={cn("cart")}>
        В корзине: <span className={cn("cart-count")}>
          {totalCartItemsCount >= 1 ?
          `${plural(totalCartItemsCount, "%d товар", "%d товара", "%d товаров")} / ${totalCartPrice.toLocaleString("ru-RU")} ₽`
          :
          "пусто"
          }
        </span>
      </span>
      <button onClick={() => onCartOpen()}>Перейти</button>
    </div>
  )
}

Controls.propTypes = {
  totalCartPrice: propTypes.number,
  totalCartItemsCount: propTypes.number,
  onCartOpen: propTypes.func
}

Controls.defaultProps = {
  totalCartPrice: 0,
  totalCartItemsCount: 0,
  onCartOpen: () => {}
}

export default React.memo(Controls);
