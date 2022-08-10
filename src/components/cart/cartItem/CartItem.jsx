import React, { useCallback } from 'react'
import { cn as bem } from "@bem-react/classname";
import '../style.css'

const CartItem = ({ onDeleteProduct, product }) => {
   const cn = bem('Item');
   const formatter = new Intl.NumberFormat('ru-RU', {
      style: 'currency',
      currency: 'RUB',
   });


   product.value += 1;

   const callbacks = {

      onClick: useCallback(() => {
         onDeleteProduct(product.code);

      }, [product]),
   };
   return (
      <div>
         <div className='Item Cart-item'>
            <div className='Left-content'>
               <div className={cn('number')}>
                  {product.code}
               </div>
               <div className={cn('title')}>
                  {product.title}
               </div>
            </div>
            <div className='Right-content'>
               <span className='Product-price'>{formatter.format(product.price)}</span>
               <span className='Product-value'>{product.value - 1} шт</span>
               <div className={cn('actions')} onClick={e => e.stopPropagation()}>
                  <button onClick={callbacks.onClick}>
                     Удалить
                  </button>
               </div>
            </div>
         </div>
      </div>
   )
}

export default React.memo(CartItem)