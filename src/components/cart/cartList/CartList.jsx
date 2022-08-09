import React, { useEffect, useState } from 'react'
import propTypes from 'prop-types';
import CartItem from '../cartItem/CartItem';

const CartList = ({ onDeleteProduct, products }) => {

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