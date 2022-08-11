import React from 'react'
import Item from '../../item';
import propTypes from 'prop-types';
import {TotalCountCart} from './total-count-cart/TotalCountCart';

export const Cart = ({ onItemDeleteFromCart, totalPrice, cart }) => {

  console.log('render')
  return (
    <>
      {
        cart.map(card => {
          return (
            <Item
              key={card.code}
              onItemDeleteFromCart={onItemDeleteFromCart}
              item={card}
              cart={true}
            />)

        })
      }
      <TotalCountCart
      totalPrice={totalPrice}
      />
    </>
  )
}
Cart.propTypes = {
  onItemDeleteFromCart: propTypes.func.isRequired,
  totalPrice: propTypes.node,
}

Cart.defaultProps = {
  onItemDeleteFromCart: () => { },
}
