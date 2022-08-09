import React from 'react';
import propTypes from 'prop-types';
import {cn as bem} from "@bem-react/classname";
import Item from "../item";
import CartItem from '../cart-item';
import './style.css';

function List(props) {
  const cn = bem('List');

  return (
    <div className={cn()}>
      {props.items.map((item, index) => (
				<div key={item.code} className={cn('item')}>
          {props.listType === 'main' && (
						<Item item={item} onAddToCart={props.onAddToCart} />
					)}
					{props.listType === 'cart' && (
						<CartItem
							item={item}
							code={index + 1}
							onDeleteFromCart={props.onDeleteFromCart}
						/>
					)}
				</div>
			))}
    </div>
  )
}

List.propTypes = {
  listType: propTypes.string.isRequired,
  items: propTypes.arrayOf(propTypes.object).isRequired,
  onAddToCart: propTypes.func,
  onDeleteFromCart: propTypes.func
}

List.defaultProps = {
  items: [],
  onAddToCart: () => {},
  onDeleteFromCart: () => {}
}

export default React.memo(List);
