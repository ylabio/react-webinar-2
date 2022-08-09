import React, { useCallback } from 'react'
import { cn as bem } from "@bem-react/classname";
import '../style.css'

const CartItem = ({ onDeleteProduct, product }) => {
   const cn = bem('Item');
   product.value !== 0 && product.value++

   const callbacks = {

      onClick: useCallback(() => {
         onDeleteProduct(product.code)

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
               <span className='Product-price'>{product.price} ₽</span>
               <span className='Product-value'>{product.value} шт</span>
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