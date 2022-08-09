import React from 'react'
import Item from '../item/Item'

const CartItem = ({ products }) => {
   function func() {
      console.log(3)
   }
   return (
      <div>
         {products.map((product, index) => <Item key={index} item={product} buttonText='Удалить' onClick={func} />)}
      </div>
   )
}

export default React.memo(CartItem)