import React, { useCallback } from 'react';
import propTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import './style.css';

function CartItem(props) {
	const cn = bem('CartItem');

	const callbacks = {
		onDeleteFromCart: useCallback(() => {
			props.onDeleteFromCart(props.item.code);
		}, [props.onDeleteFromCart]),
	};

	return (
		<div className={cn()}>
			<div className={cn('number')}>{props.code}</div>
			<div className={cn('title')}>{props.item.title}</div>
			<div className={cn('price')}>
				{props.item.price.toLocaleString('ru-RU')} ₽
			</div>
			<div className={cn('quantity')}>{props.item.quantity} шт</div>
			<button onClick={callbacks.onDeleteFromCart}>Удалить</button>
		</div>
	);
}

CartItem.propTypes = {
	item: propTypes.object.isRequired,
	code: propTypes.number.isRequired,
	onDeleteFromCart: propTypes.func.isRequired,
};

CartItem.defaultProps = {
	onDeleteFromCart: () => {},
};

export default React.memo(CartItem);
