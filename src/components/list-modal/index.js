import React, { memo } from 'react';
import { cn as bem } from '@bem-react/classname';
import SumModal from '../sum-modal';
import propTypes from 'prop-types';
import Item from '../item';

const ListModal = ({ cart, onDelete, sumInCart, activeCart }) => {
  const cn = bem('List');

  return (
    <div className={cn()}>
      {cart.map((item, index) => (
        <div key={index} className={cn('item')}>
          <Item item={item} onDelete={onDelete} activeCart={activeCart} />
        </div>
      ))}
      <SumModal sumInCart={sumInCart} />
    </div>
  );
};

ListModal.propTypes = {
  cart: propTypes.arrayOf(propTypes.object).isRequired,
  onDelete: propTypes.func,
  sumInCart: propTypes.number,
  activeCart: propTypes.bool,
};

ListModal.defaultProps = {
  cart: [],
  onDelete: () => {},
  activeCart: false,
};

export default memo(ListModal);
