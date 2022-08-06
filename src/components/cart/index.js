import React from 'react';
import propTypes from 'prop-types';
import {cn as bem} from "@bem-react/classname";
import List from '../list';
import Button from '../ui/button';
import './style.css';

function Cart({orders, onClose, deleteFromCart}){
	//! Суммируем цену выбранных товаров
	const product = orders?.reduce((acc, item) => {
		return acc + item?.amount * item?.price
	}, 0);

	const cn = bem('Cart');

	return (
		<div className={cn()}>
			<div className={cn('head')}>
				<h1 className={cn('title')}>Корзина</h1>
				<div>
					<Button onClick={onClose}>Закрыть</Button>
				</div>
			</div>
			<div className={cn('list')}>
				<List 
					items={orders} 
					deleteFromCart={deleteFromCart} 
					cartItem
					product={product}
				/>
			</div>
		</div>
	)
}

Cart.propTypes = {
	orders: propTypes.arrayOf(propTypes.object),
	onClose: propTypes.func.isRequired, 
	deleteFromCart: propTypes.func.isRequired
}

Cart.defaultProps = {
	orders: [],
	onClose: () => {}, // Значение по умолчанию - функция-заглушка
	deleteFromCart: () => {}
}

export default React.memo(Cart);
