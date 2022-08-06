import React from 'react';
import './style.css';
import propTypes from "prop-types";
import {cn as bem} from "@bem-react/classname";
import Layout from "../layout";
import List from "../list";
import {getAllCartItemsCost} from "../../utils";

function Cart({cartItems, deleteCartItems }) {
  const cn = bem('Cart');

  return (
    <div>
      <List items={cartItems}
            button={deleteCartItems}
            buttonText={'Удалить'}/>
      {cartItems.length
        ? <div className={cn('total-price')}>
          <strong>
            <span>Итого</span>
            <span>{`${getAllCartItemsCost(cartItems).toLocaleString('ru')} ₽`}</span>
          </strong>
        </div>
        : ''}
    </div>
  )
}

Cart.propTypes = {
  cartItems: propTypes.arrayOf(propTypes.object).isRequired,
  deleteCartItems: propTypes.func
}

Cart.defaultProps = {
  cartItems: [],
  deleteCartItems: () => {}
}

export default React.memo(Cart);