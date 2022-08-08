import plural from 'plural-ru';
import React from 'react';
import propTypes from 'prop-types';
import {getPrice, getSum} from '../../utils';
import Button from '../button';
import style from './style.css';

const getContentTotal = basket => {
	const numberOfGoods = basket.length;
	const sum = getSum(basket);
	return numberOfGoods ? ` ${numberOfGoods} ${plural(basket.length, 'товар', 'товара', 'товаров')} / ${getPrice(sum)}` : 'Пусто'
};

function ModalPreview({basket, onTransition}){
	return (
		<div className={'ModalPreview'}>
			В корзине:
			<span className={'ModalPreview_Total'}> {getContentTotal(basket)} </span>
			<Button callback={onTransition} title='Перейти' />
		</div>
	)
}

ModalPreview.propTypes = {
	basket: propTypes.arrayOf(propTypes.object),
	onTransition: propTypes.func
}

ModalPreview.defaultProps = {
	basket: [],
	onTransition: () => {}
}

export default ModalPreview;
