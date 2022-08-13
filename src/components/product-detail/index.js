import React, { useCallback } from 'react';
import propTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import numberFormat from '../../utils/number-format';
import './style.css';
import { localize } from '../../utils/localize';
import useSelector from '../../utils/use-selector';

function ProductDetail({ item, onAdd }) {
	const cn = bem('ProductDetail');

	const select = useSelector((state) => ({
		language: state.localization.language,
	}));

	const callbacks = {
		onAdd: useCallback((e) => onAdd(item._id), [onAdd, item]),
	};

	return (
		<div className={cn()}>
			<div className={cn('description')}>{item.description}</div>
			<ul className={cn('characteristics')}>
				<li className={cn('characteristicsItem')}>
					{localize['Страна производитель'][select.language]}:
					<span>
						{item.maidIn.title} ({item.maidIn.code})
					</span>
				</li>
				<li className={cn('characteristicsItem')}>
					{localize['Категория'][select.language]}:
					<span>{item.category.title}</span>
				</li>
				<li className={cn('characteristicsItem')}>
					{localize['Год выпуска'][select.language]}:<span>{item.edition}</span>
				</li>
				<li className={cn('characteristicsItem', { price: true })}>
					{localize['Цена'][select.language]}:
					<span>{numberFormat(item.price)} ₽</span>
				</li>
			</ul>
			<button onClick={callbacks.onAdd}>
				{localize['Добавить'][select.language]}
			</button>
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
