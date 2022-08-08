import React from 'react'
import Item from '../item/Item'

const CartItem = ({ products }) => {
   return (
      <div>
         {products.map((product, index) => <Item key={index} item={product} button={
            <button>
               Удалить
            </button>
         } />)}
      </div>
   )
}

export default React.memo(CartItem)