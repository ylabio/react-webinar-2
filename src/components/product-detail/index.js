import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import numberFormat from '../../utils/number-format';
import './style.css';
import { localize } from '../../utils/localize';

function ProductDetail({ item, onAdd, language }) {
	const cn = bem('ProductDetail');

	const callbacks = {
		onAdd: useCallback((e) => onAdd(item._id), [onAdd, item]),
	};

	return (
		<div className={cn()}>
			<div className={cn('description')}>{item.description}</div>
			<ul className={cn('characteristics')}>
				<li className={cn('characteristicsItem')}>
					{localize['Страна производитель'][language]}:
					<span>
						{item.maidIn.title} ({item.maidIn.code})
					</span>
				</li>
				<li className={cn('characteristicsItem')}>
					{localize['Категория'][language]}:
					<span>{item.category.title}</span>
				</li>
				<li className={cn('characteristicsItem')}>
					{localize['Год выпуска'][language]}:<span>{item.edition}</span>
				</li>
				<li className={cn('characteristicsItem', { price: true })}>
					{localize['Цена'][language]}:
					<span>{numberFormat(item.price)} ₽</span>
				</li>
			</ul>
			<button onClick={callbacks.onAdd}>
				{localize['Добавить'][language]}
			</button>
		</div>
	);
}

ProductDetail.propTypes = {
	item: PropTypes.object.isRequired,
	onAdd: PropTypes.func,
	language: PropTypes.string.isRequired,
};

ProductDetail.defaultProps = {
	onAdd: () => {},
};

export default React.memo(ProductDetail);
