//Core
import React from 'react';

//3rd party libraries
import propTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';

//Local
import Item from '../item';
import './style.css';

/**
 * Элемент-список для отображения данных про товары
 * @param items {Array} данные о товарах
 * @param btnTitle {String} название кнопки
 * @param itemAction {Function} callback при клике на кнопку
 * @return {React.ReactElement} Виртуальные элементы React
 */
function List({ items, btnTitle, itemAction }) {
	const cn = bem('List');

	return (
		<ul className={cn()}>
			{items.map((item, index) => (
				<li key={item.code} className={cn('item')}>
					<Item
						index={index + 1}
						item={item}
						btnTitle={btnTitle}
						btnAction={itemAction}
					/>
				</li>
			))}
		</ul>
	);
}

List.propTypes = {
	items: propTypes.arrayOf(propTypes.object).isRequired,
	btnTitle: propTypes.string.isRequired,
	itemAction: propTypes.func,
};

List.defaultProps = {
	items: [],
	btnTitle: 'Добавить',
	itemAction: () => {},
};

export default React.memo(List);
