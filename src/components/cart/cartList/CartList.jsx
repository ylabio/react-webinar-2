import React from 'react'
import propTypes from 'prop-types';
import CartItem from '../cartItem/CartItem';

const CartList = ({ products }) => {
   return (
      <>
         {products.map(product => <CartItem product={product} />)}
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