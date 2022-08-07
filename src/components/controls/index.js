import React, { useState } from 'react';
import propTypes from 'prop-types';
import './style.css';
import Button from '../button';
import InCartSummary from './incartsummary';
import Cart from '../cart';

function Controls(props) {
  const { cart, onItemDelete } = props;

  const [isCartOpen, setIsCartOpen] = useState(false);

  function closeCart() {
    setIsCartOpen(false);
  }

  return (
    <div className='Controls'>
      <InCartSummary cart={cart} />
      <Button onClick={() => setIsCartOpen(!isCartOpen)}>Перейти</Button>
      {isCartOpen && <Cart cart={cart} onItemDelete={onItemDelete} onClose={closeCart} />}
    </div>
  );
}

Controls.propTypes = {
  cart: propTypes.array.isRequired,
  onItemDelete: propTypes.func.isRequired,
};

export default React.memo(Controls);
