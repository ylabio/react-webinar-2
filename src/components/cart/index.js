import React from 'react';
import { cn as bem } from '@bem-react/classname';
import './style.css';
import propTypes from 'prop-types';
import List from '../list';
import Summary from './summary';

function Cart(props) {
  const { cart, onItemDelete } = props;

  const cn = bem('Cart');
  return (
    <>
      <List items={cart.inCart} inCart={true} onItemDelete={onItemDelete} />
      <Summary amount={cart.amount} />
    </>
  );
}

Cart.propTypes = {
  cart: propTypes.object.isRequired,
  onItemDelete: propTypes.func.isRequired,
};

export default React.memo(Cart);
