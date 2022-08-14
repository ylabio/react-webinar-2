import React, {useCallback} from "react";
import {cn as bem} from "@bem-react/classname";
import useSelector from '../../utils/use-selector';
import useStore from '../../utils/use-store';
import style from './style.css';

const cn = bem('Product');

function ProductCard(){
	const store = useStore();
	const select = useSelector(state => ({
		product: state.product.product
	}));

	const callbacks = {
		addToBasket: useCallback(_id => store.get('basket').addToBasket(_id), []),
	};

	return (
			<div className={cn()}>
				<div>{select.product.description}</div>
				<div>Страна производитель: <span>{select.product.maidIn?.title} ({select.product.maidIn?.code})</span></div>
				<div>Категория: <span>{select.product.category?.title}</span></div>
				<div>Год выпуска: <span>{select.product.edition}</span></div>
				<div className={cn('price')}>Цена: <span>{select.product.price} {'\u20bd'}</span></div>
				<button onClick={() => callbacks.addToBasket(select.product._id)}>Добавить</button>
			</div>
	)
}

export default React.memo(ProductCard);
