import React, {useState} from 'react';
import propTypes from 'prop-types';
import './style.css';
import {cn as bem} from '@bem-react/classname';
import plural from "plural-ru";
import {getAllCartItemsCost} from "../../utils";
import Modal from "../modal";
import Cart from "../cart";


function Controls({cartItems, deleteCartItems, store}) {
  const cn = bem('Controls');

  const [isModalActive, setIsModalActive] = useState(false);

  const toggleCart = () => {
    setIsModalActive((value) => !value);
  }

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
                               closeModal={toggleCart}
                               cartItems={cartItems}
                               deleteCartItems={deleteCartItems}
        /*children={<Cart store={store}/>}*//>}

    </div>
  )
}

Controls.propTypes = {
  cartItems: propTypes.arrayOf(propTypes.object).isRequired,
  deleteCartItems: propTypes.func
}

Controls.defaultProps = {
  cartItems: [],
  deleteCartItems: () => {
  }
}

export default React.memo(Controls);
