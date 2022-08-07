import React from 'react';
import propTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import './style.css';
import CartItem from '../cart-item';

function CartList(props) {
	const cn = bem('CartList');

	return (
		<div className={cn()}>
			{props.cartItems.map((item, index) => (
				<div key={item.code} className={cn('item')}>
					<CartItem
						item={item}
						code={index + 1}
						onDeleteFromCart={props.onDeleteFromCart}
					/>
				</div>
			))}
		</div>
	);
}

CartList.propTypes = {
	cartItems: propTypes.arrayOf(propTypes.object).isRequired,
	onDeleteFromCart: propTypes.func.isRequired,
};

CartList.defaultProps = {
	cartItems: [],
	onDeleteFromCart: () => {},
};

export default React.memo(CartList);
