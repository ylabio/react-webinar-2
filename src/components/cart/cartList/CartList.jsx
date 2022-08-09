import React, { useEffect } from 'react'
import propTypes from 'prop-types';
import CartItem from '../cartItem/CartItem';

const CartList = ({ onDeleteProduct, products }) => {

   useEffect(() => {
      if (products.filter((item, pos) => products.indexOf(item) == pos)) {
         console.log(1)
      }
   }, [products])

   return (
      <>
         {products.map((product, index) => <CartItem key={index} onDeleteProduct={onDeleteProduct} product={product} />)}
      </>
   )
}

CartList.propTypes = {
   products: propTypes.arrayOf(propTypes.object).isRequired
}

CartList.defaultProps = {
   products: []
}


export default React.memo(CartList)