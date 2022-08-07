import React, { memo } from 'react';
import ItemModal from '../item-modal';
import { cn as bem } from '@bem-react/classname';
import SumModal from '../sum-modal';
import propTypes from 'prop-types';

const ListModal = ({ cart, onDelete, sumInCart }) => {
  const cn = bem('List');

  return (
    <div className={cn()}>
      {cart.map((item, index) => (
        <div key={index} className={cn('item')}>
          <ItemModal item={item} onDelete={onDelete} />
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
};

ListModal.defaultProps = {
  cart: [],
  onDelete: () => {},
};

export default memo(ListModal);
