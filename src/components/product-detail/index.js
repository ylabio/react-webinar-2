import React, { useCallback } from 'react';
import propTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import numberFormat from '../../utils/number-format';
import './style.css';

function ProductDetail({ item, onAdd }) {
	const cn = bem('ProductDetail');

	const callbacks = {
		onAdd: useCallback((e) => onAdd(item._id), [onAdd, item]),
	};

	return (
		<div className={cn()}>
			<div className={cn('description')}>{item.description}</div>
			<ul className={cn('characteristics')}>
				<li className={cn('characteristicsItem')}>
					Страна производитель:
					<span>
						{item.maidIn.title} ({item.maidIn.code})
					</span>
				</li>
				<li className={cn('characteristicsItem')}>
					Категория:<span>{item.category.title}</span>
				</li>
				<li className={cn('characteristicsItem')}>
					Год выпуска:<span>{item.edition}</span>
				</li>
				<li className={cn('characteristicsItem', { price: true })}>
					Цена:<span>{numberFormat(item.price)} ₽</span>
				</li>
			</ul>
			<button onClick={callbacks.onAdd}>Добавить</button>
		</div>
	);
}

ProductDetail.propTypes = {
	item: propTypes.object.isRequired,
	onAdd: propTypes.func,
};

ProductDetail.defaultProps = {
	onAdd: () => {},
};

export default React.memo(ProductDetail);
