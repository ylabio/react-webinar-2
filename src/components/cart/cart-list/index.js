import React from 'react';
import propTypes from 'prop-types';
import {cn as bem} from "@bem-react/classname";
import CartItem from "../cart-item";
import './style.css';

function CartList({items, deleteCartItems}) {
  const cn = bem('CartList');

  return (
    <div className={cn()}>{items.map((item, index) =>
      <div key={item.code} className={cn('item')}>
        <CartItem item={item} index={index + 1} deleteCartItems={deleteCartItems}/>
      </div>
    )}
    </div>
  )
}

CartList.propTypes = {
  items: propTypes.arrayOf(propTypes.object).isRequired,
  deleteCartItems: propTypes.func,
}

CartList.defaultProps = {
  deleteCartItems: () => {},
}

export default React.memo(CartList);
