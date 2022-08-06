import React from 'react';
import './style.css';
import propTypes from "prop-types";
import {cn as bem} from "@bem-react/classname";
import List from "../list";
import {getAllPrice} from "../../utils";

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
            <span>{getAllPrice(cartItems)}</span>
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