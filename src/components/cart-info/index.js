//Core
import React from 'react';

//3rd party libraries
import propTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';

//Local
import List from '../list';
import './style.css';

/*
 * Корзина
 * @param items {Array} Массив объектов
 * @param totalPrice {Numver} общая сумма
 * @param onDeleteItem {Function} callback для удаления элемента
 * @return {React.ReactElement} Виртуальные элементы React
 */
function CartInfo({ items, totalPrice, onDeleteItem }) {
	const cn = bem('Cart');

	if (items.length === 0)
		return <div className={cn('empty')}>Заказов еще нет</div>;

	return (
		<>
			<List items={items} itemAction={onDeleteItem} btnTitle="Удалить" />
			<div className={cn('overall')}>
				<span>Итого</span>
				{totalPrice}
			</div>
		</>
	);
}

CartInfo.propTypes = {
	items: propTypes.arrayOf(propTypes.object).isRequired,
	onDeleteItem: propTypes.func.isRequired,
	totalPrice: propTypes.string.isRequired,
};

CartInfo.defaultProps = {
	items: [],
	onDeleteItem: () => {},
	totalPrice: '0',
};

export default React.memo(CartInfo);
