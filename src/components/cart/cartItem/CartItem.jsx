import React from 'react'
import { cn as bem } from "@bem-react/classname";
import '../style.css'

const CartItem = ({ product }) => {
   const cn = bem('Item');

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
                  <button>
                     Удалить
                  </button>
               </div>
            </div>
         </div>
      </div>
   )
}

export default React.memo(CartItem)