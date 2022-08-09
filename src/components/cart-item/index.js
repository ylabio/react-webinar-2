import React, { useCallback } from "react";
import { cn as bem } from "@bem-react/classname";
import numeral from 'numeral';
import './style.css';

function CartItem(props) {
   const cn = bem('CartItem');
   const callbacks = {
      onDelete: useCallback((e) => {
         e.stopPropagation();
         props.onDelete(props.item)
         console.log(props.item)
      }, [props.onDelete]),
   }
   return (
      <div className={cn()}>
         <div className={cn('number')}>
            {props.item.code}
         </div>
         <div className={cn('title')}>
            {props.item.title}
         </div>
         <div className={cn('price')}>
            {numeral(props.item.price).format('0,0')} ₽
         </div>
         <div className={cn('count')}>
            {props.item.addCount}
         </div>
         <div className={cn('actions')}>
            <button onClick={callbacks.onDelete}>
               Удалить
            </button>
         </div>
      </div>
   )
}

export default React.memo(CartItem)