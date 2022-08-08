import React from 'react'
import CartItem from './CartItem'
import propTypes from 'prop-types';

const CartList = ({ products }) => {
   return (
      <CartItem products={products} />
   )
}

CartList.propTypes = {
   products: propTypes.arrayOf(propTypes.object).isRequired
}

CartList.defaultProps = {
   products: []
}


export default React.memo(CartList)