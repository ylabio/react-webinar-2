import React from 'react';
import propTypes from 'prop-types';
import {cn as bem} from "@bem-react/classname";
import plural from 'plural-ru';
import './style.css';

function Cart({cartItems}) {
  const cn = bem('Cart');

  return (
    <div className={cn()}>
      <div className=''></div>
    </div>
  )
}

export default Cart;