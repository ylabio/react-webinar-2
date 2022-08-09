import React from 'react';
import propTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import './style.css';
import List from '../list';

function Cart(props) {
	const cn = bem('Cart');

	return (
		<div className={cn()}>
			{props.cartItems.length > 0 ? (
				<>
					<List
						listType='cart'
						items={props.cartItems}
						onDeleteFromCart={props.onDeleteFromCart}
					/>
					<div className={cn('total')}>
						<div className={cn('totalTitle')}>Итого</div>
						<div className={cn('totalPrice')}>
							{props.totalPrice.toLocaleString('ru-RU')} ₽
						</div>
					</div>
				</>
			) : (
				<h2 className={cn('bodyEmpty')}>Корзина пуста!</h2>
			)}
		</div>
	);
}

Cart.propTypes = {
	cartItems: propTypes.arrayOf(propTypes.object).isRequired,
	totalPrice: propTypes.number.isRequired,
	onDeleteFromCart: propTypes.func.isRequired,
};

Cart.defaultProps = {
	cartItems: [],
	onDeleteFromCart: () => {},
};

export default React.memo(Cart);
