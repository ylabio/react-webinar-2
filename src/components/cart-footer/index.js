import React from "react";
import { cn as bem } from "@bem-react/classname";
import './style.css';

function CartFooter({ totalPrice }) {
   const cn = bem('Cart-footer');
   if (!totalPrice) {
      return
   }
   return (
      <div className={cn()}>
         <div className={cn('totalAmount')}>
            Итого  {totalPrice.toLocaleString()} ₽
         </div>
      </div>
   )
}


export default React.memo(CartFooter)