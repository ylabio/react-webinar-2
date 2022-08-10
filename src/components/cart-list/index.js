import React from 'react';
import propTypes from 'prop-types';
import {cn as bem} from "@bem-react/classname";
import CartItem from "../cart-item";
import './style.css';

function CartList(props) {
  const cn = bem('List');

  return (
    <>
      <div className={cn()}>{props.cart.map(item =>
        <div key={item.code} className={cn('item')}>
          <CartItem item={item} onDelete={props.onItemDelete}/>
        </div>
      )}
      </div>
      <div className={cn('bottom')}>
        <span>Итого</span>
        <span className={cn('amount-total')}>{props.sumInCart.toLocaleString('ru')} ₽</span>
      </div>
    </>
  )
}

CartList.propTypes = {
  cart: propTypes.arrayOf(propTypes.object).isRequired,
  onItemDelete: propTypes.func,
  sumInCart: propTypes.number,
}

CartList.defaultProps = {
  onItemDelete: () => {},
}

export default React.memo(CartList);
