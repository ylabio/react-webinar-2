import React from 'react';
import propTypes from 'prop-types';
import plural from 'plural-ru';
import { cn as bem } from '@bem-react/classname';
import numberFormat from '../../utils/numberFormat';
import './styles.css';
import { Link } from 'react-router-dom';

function LinkedBasket({ sum, amount, linkURL, onOpen }) {
	const cn = bem('LinkedBasket');

	return (
		<div className={cn()}>
			<div className={cn('link')}>
				<Link to={linkURL}>Главная</Link>
			</div>
			<span className={cn('label')}>В корзине:</span>
			<span className={cn('total')}>
				{amount
					? `${amount} ${plural(
							amount,
							'товар',
							'товара',
							'товаров',
					  )} / ${numberFormat(sum)} ₽`
					: `пусто`}
			</span>
			<button className="LinkedBasket__button" onClick={onOpen}>
				Перейти
			</button>
		</div>
	);
}

LinkedBasket.propTypes = {
	onOpen: propTypes.func.isRequired,
	sum: propTypes.number,
	linkURL: propTypes.string,
	amount: propTypes.number,
};

LinkedBasket.defaultProps = {
	sum: 0,
	amount: 0,
	linkURL: '/',
};

export default React.memo(LinkedBasket);
