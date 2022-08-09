//Core
import React, { useMemo } from 'react';

//3rd party libraries
import propTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';

//Local
import { getCartSnapshot } from '../../utils';
import './style.css';

/**
 * Sidebar для отображения данных о корзине с возможностью перейти в корзину при клике на кнопку
 * @param itemsCount {Number} кол-во вещей в корзине
 * @param totalPrice {Number} общая сумма
 * @param onCartOpen {Function} callback при клике на кнопку
 * @return {React.ReactElement} Виртуальные элементы React
 */
function Controls({ itemsCount, totalPrice, onCartOpen }) {
	const cn = bem('Controls');
	const cartSnapshot = useMemo(
		getCartSnapshot.bind(null, itemsCount, totalPrice),
		[itemsCount, totalPrice],
	);

	return (
		<div className={cn()}>
			<p>
				В корзине :<b className={cn('cart-snapshot')}>{cartSnapshot}</b>
			</p>
			<button className={cn('btn')} onClick={onCartOpen}>
				Перейти
			</button>
		</div>
	);
}

Controls.propTypes = {
	itemsCount: propTypes.number.isRequired,
	totalPrice: propTypes.string.isRequired,
	onCartOpen: propTypes.func.isRequired,
};

Controls.defaultProps = {
	itemsCount: 0,
	totalPrice: 0,
	onCartOpen: () => {},
};

export default React.memo(Controls);
