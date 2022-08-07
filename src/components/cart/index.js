import React from 'react';
import { cn as bem } from '@bem-react/classname';
import './style.css';
import Button from '../button';
import propTypes from 'prop-types';
import List from '../list';
import Summary from './summary';

function Cart(props) {
  const { cart, onItemDelete, onClose } = props;

  const cn = bem('Cart');
  return (
    <div className={cn('wrapper')}>
      <div className={cn()}>
        <div className={cn('head')}>
          <h2>Корзина</h2>
          <Button onClick={() => onClose()}>Закрыть</Button>
        </div>
        <List items={cart} inCart={true} onItemDelete={onItemDelete} />
        <Summary cart={cart} />
      </div>
    </div>
  );
}

Cart.propTypes = {
  cart: propTypes.array.isRequired,
  onItemDelete: propTypes.func.isRequired,
  onClose: propTypes.func.isRequired,
};

export default React.memo(Cart);
