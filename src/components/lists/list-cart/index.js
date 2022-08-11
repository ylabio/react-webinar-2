import React from 'react';
import propTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import './style.css';
import ItemCart from '../../items/item-cart';

function ListCart(props) {
  const cn = bem('ListCart');

  return (
    <div className={cn()}>
      {props.items.map((item, i) => (
        <div key={item.code} className={cn('item')}>
          <ItemCart
            item={item}
            itemStackNumber={i + 1}
            onDeleteItemFromCart={props.onDeleteItemFromCart}
          />
        </div>
      ))}
    </div>
  );
}

ListCart.propTypes = {
  items: propTypes.arrayOf(propTypes.object).isRequired,
  onDeleteItemFromCart: propTypes.func,
};

ListCart.defaultProps = {
  onDeleteItemFromCart: () => {},
};

export default React.memo(ListCart);
