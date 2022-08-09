import React, { useMemo, useState } from 'react'
import CartList from '../cart/cartList/CartList'
import ModalHead from './ModalHead'
import Totalprice from './Totalprice'
import './style.css'

const CartModalContent = ({ setModalStatus, onDeleteProduct, products }) => {
   const [totalPrice, setTotalPrice] = useState(0)

   useMemo(() => {
      if (products.length !== 0) {
         const res = products.map(item => item.value * item.price).reduce((item, total) => total += item, 0)
         setTotalPrice(res)
      }
   }, [products, totalPrice])

   return (
      <>
         <ModalHead setModalStatus={setModalStatus} />
         <CartList products={products} onDeleteProduct={onDeleteProduct} />
         {
            (products.length !== 0) ? <Totalprice totalPrice={totalPrice} /> :
               <div>
                  <strong className='Empty-cart-text'>Товаров в корзине нет</strong>
               </div>
         }
      </>
   )
}

export default CartModalContent