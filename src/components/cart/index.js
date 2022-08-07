import React from 'react';
import propTypes from 'prop-types';
import {cn as bem} from "@bem-react/classname";
import './style.css';
import ItemCart from "../item-cart";
import {formattingNumber, total} from "../../utils";

function Cart(props) {
  const cn = bem('Cart');

  return (
      <div className={cn()}>{props.cart.map(item =>
          <div key={item.code} className={cn('item-cart')}>
            <ItemCart item={item} onDeleteProduct={props.onDeleteProduct}/>
          </div>
      )}
        {props.cart.length
            ? <>
              <div className={cn('title')}>
                <div className={cn('total')}>Итого</div>
                <div className={cn('price')}> {formattingNumber(total(props.cart))}</div>
              </div>
            </>
            : <b className={cn('title-empty')}>Корзина пуста</b>}
      </div>
  )
}

Cart.propTypes = {
  cart: propTypes.arrayOf(propTypes.object).isRequired,
  onDeleteProduct: propTypes.func
}

Cart.defaultProps = {
  cart: [],
  onDeleteProduct: () => {
  }
}

export default React.memo(Cart);
