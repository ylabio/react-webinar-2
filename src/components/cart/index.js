import React from "react";
import propTypes from 'prop-types';
import { cn as bem } from "@bem-react/classname";
import './style.css';
import CartItem from "../cart-item";

function Cart(props) {
   const cn = bem('CartList');
   console.log(props.items.length);
   if (props.items.length > 0) {
      return (
         <div className={cn()}>{props.items.map((item, index) =>
            <CartItem key={item.code} className={cn('item')} item={item} onDelete={props.onItemDelete} />
         )}
         </div>
      )
   }
   else {
      return (
         <div className={cn('empty')}>
            Корзина пуста
         </div>
      )
   }

}

Cart.propTypes = {
   items: propTypes.arrayOf(propTypes.object).isRequired,
   onItemDelete: propTypes.func
}

Cart.defaultProps = {
   items: [],
   onItemDelete: () => { }
}

export default React.memo(Cart);