import React from 'react';
import propTypes from 'prop-types';
import {cn as bem} from "@bem-react/classname";
import CartItem from "../cart-item";
import './style.css';

function CartList(props) {
  const cn = bem('Cart-list');

  return (
    <div className={cn()}>{props.items.map((item) =>
      <div key={item.code} className={cn('item')}>
        <CartItem item={item}  onHandleBtn={props.onHandleBtn}/>
      </div>
    )}
    </div>
  )
}

CartList.propTypes = {
  items: propTypes.arrayOf(propTypes.object).isRequired,
  onHandleBtn: propTypes.func.isRequired,
}

CartList.defaultProps = {
  items: [],
  onHandleBtn: () => {}
}

export default React.memo(CartList);
