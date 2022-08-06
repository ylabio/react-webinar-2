import React from 'react';
import propTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import plural from 'plural-ru';
import './style.css';

function CartPreview(props) {
	const cn = bem('CartPreview');

	return (
		<div className={cn()}>
			<div className={cn('title')}>В корзине:</div>
			{props.totalQuantity > 0 ? (
				<div className={cn('info')}>
					<div className={cn('infoCount')}>
						{props.totalQuantity}{' '}
						<span>{`${plural(
							props.totalQuantity,
							'товар',
							'товара',
							'товаров',
						)}`}</span>
					</div>
					<span className={cn('infoSeparator')}>/</span>
					<div className={cn('infoTotal')}>
						{props.totalPrice.toLocaleString('ru-RU')} ₽
					</div>
				</div>
			) : (
				<div className={cn('info')}>пусто</div>
			)}
			<button onClick={props.toggleModal}>Перейти</button>
		</div>
	);
}

CartPreview.propTypes = {
	totalQuantity: propTypes.number.isRequired,
	totalPrice: propTypes.number.isRequired,
	toggleModal: propTypes.func.isRequired,
};

CartPreview.defaultProps = {
	toggleModal: () => {},
};

export default React.memo(CartPreview);
