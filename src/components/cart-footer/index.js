import React from "react";
import { cn as bem } from "@bem-react/classname";
import numeral from 'numeral';
import './style.css';

function CartFooter({ totalPrice }) {
   const cn = bem('Cart-footer');
   if (!totalPrice) {
      return
   }
   return (
      <div className={cn()}>
         <div className={cn('totalAmount')}>
            Итого  {numeral(totalPrice).format('0,0')} ₽
         </div>
      </div>
   )
}


export default React.memo(CartFooter)