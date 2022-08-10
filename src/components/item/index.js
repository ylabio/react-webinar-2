//Core
import React from 'react';

//3rd party libraries
import propTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';

//Local
import { toRUB } from '../../utils';
import './style.css';

/**
 * Элемент с данными о товаре для отображения в списке
 * @param index {Number} индек в списке
 * @param item {Object} данные о товаре
 * @param btnTitle {String} название кнопки
 * @param btnAction {Function} callback при клике на кнопку
 * @return {React.ReactElement} Виртуальные элементы React
 */
function Item({ index, item, btnTitle, btnAction }) {
	const cn = bem('Item');

	return (
		<div className={cn()}>
			<div className={cn('left')}>
				<div className={cn('number')}>{index}</div>
				<div className={cn('title')}>{item.title}</div>
			</div>
			<div className={cn('right')}>
				<div className={cn('price')}>{toRUB(item.price)}</div>
				{item.count && (
					<div className={cn('count')}>{`${item.count}шт`}</div>
				)}
				<button onClick={btnAction.bind(null, item)}>{btnTitle}</button>
			</div>
		</div>
	);
}

Item.propTypes = {
	index: propTypes.number.isRequired,
	item: propTypes.object.isRequired,
	btnTitle: propTypes.string.isRequired,
	BtnAction: propTypes.func.isRequired,
};

Item.defaultProps = {
	index: 1,
	item: {},
	btnTitle: 'Добавить',
	BtnAction: () => {},
};

export default React.memo(Item);
