import React, { useEffect } from 'react';
import propTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import './style.css';
import Cart from '../cart';

function Modal(props) {
	const cn = bem('Modal');

	const keydownHandler = ({ key }) => {
		switch (key) {
			case 'Escape':
				props.toggleModal();
				break;
			default:
		}
	};

	useEffect(() => {
		document.addEventListener('keydown', keydownHandler);
		return () => document.removeEventListener('keydown', keydownHandler);
	});

	return (
		<div className={cn()} onClick={props.toggleModal}>
			<div className={cn('body')} onClick={(e) => e.stopPropagation()}>
				<div className={cn('bodyHead')}>
					<h1>{props.title}</h1>
					<button onClick={props.toggleModal}>Закрыть</button>
				</div>
				<div className={cn('bodyContent')}>
					<Cart
						cartItems={props.cartItems}
						onDeleteFromCart={props.onDeleteFromCart}
						totalPrice={props.totalPrice}
					/>
				</div>
			</div>
		</div>
	);
}

Modal.propTypes = {
	title: propTypes.string.isRequired,
	cartItems: propTypes.arrayOf(propTypes.object).isRequired,
	totalPrice: propTypes.number.isRequired,
	toggleModal: propTypes.func.isRequired,
	onDeleteFromCart: propTypes.func.isRequired,
};

Modal.defaultProps = {
	cartItems: [],
	toggleModal: () => {},
	onDeleteFromCart: () => {},
};

export default React.memo(Modal);
