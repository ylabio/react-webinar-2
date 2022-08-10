import React from 'react';
import propTypes from 'prop-types';
import {cn as bem} from "@bem-react/classname";
import './style.css';
import CartItem from '../cart-item';

function CartList(props) {

  const cn = bem('CartList');

  return (
    <div className={cn()}>{props.items.map(item =>
      <div key={item.code} className={cn('item')}>
        <CartItem item={item}
                   items={props.items}
                   onDeleteItems={props.onDeleteItems}/>
      </div>
    )}
    </div>
  )
}

CartList.propTypes = {
  items: propTypes.arrayOf(propTypes.object).isRequired,
  onDeleteItems: propTypes.func
}

CartList.defaultProps = {
  items: [],
  onDeleteItems: () => {}
}

export default React.memo(CartList);
