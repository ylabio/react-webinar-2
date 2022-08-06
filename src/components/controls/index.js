import React, {useState} from 'react';
import propTypes from 'prop-types';
import './style.css';
import {cn as bem} from '@bem-react/classname';
import plural from "plural-ru";
import {getAllCartItemsCost} from "../../utils";
import Modal from "../modal";
import Cart from "../cart";


function Controls({ cartItems, deleteCartItems, isModalActive, toggleCart }) {
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
      {isModalActive && <Modal isModalActive={isModalActive}
                               toggleCart={toggleCart}
                               cartItems={cartItems}
                               deleteCartItems={deleteCartItems}
        /*children={<Cart store={store}/>}*//>}

    </div>
  )
}

Controls.propTypes = {
  isModalActive: propTypes.bool,
  toggleCart: propTypes.func,
  cartItems: propTypes.arrayOf(propTypes.object).isRequired,
  deleteCartItems: propTypes.func
}

Controls.defaultProps = {
  isModalActive: false,
  toggleCart: () => {},
  cartItems: [],
  deleteCartItems: () => {}
}

export default React.memo(Controls);
