import React from 'react';
import propTypes from 'prop-types';
import './style.css';
import Button from '../button';
import InCartSummary from './incartsummary';
import Cart from '../cart';

function Controls(props) {
  const { cart, onCartOpen } = props;

  function closeCart() {
    setIsCartOpen(false);
  }

  return (
    <div className='Controls'>
      <InCartSummary cart={cart} />
      <Button onClick={() => onCartOpen()}>Перейти</Button>
    </div>
  );
}

Controls.propTypes = {
  cart: propTypes.object.isRequired,
  onCartOpen: propTypes.func.isRequired,
};

export default React.memo(Controls);
