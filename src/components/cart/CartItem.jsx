import React from 'react'
import Item from '../item/Item'

const CartItem = ({ products }) => {
   return (
      <div>
         {products.map((product, index) => <Item key={index} item={product} />)}
      </div>
   )
}

export default React.memo(CartItem)