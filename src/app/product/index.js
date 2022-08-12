import React, { useCallback, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Layout from '../../components/layout';
import ProductDetail from '../../components/product-detail';
import useSelector from '../../utils/use-selector';
import useStore from '../../utils/use-store';

function Product() {
	const { id } = useParams();

	const store = useStore();

	useEffect(() => {
		// store.get('')
		store.get('product').load(id);
		return () => {
			store.get('product').reset();
		};
	}, []);

	const { item } = useSelector((state) => ({
		item: state.product.item,
	}));

	const callbacks = {
		// Добавление в корзину
		addToBasket: useCallback((_id) => store.get('basket').addToBasket(_id), []),
	};

	return (
		<Layout head={<h1>{item.product.title}</h1>}>
			<ProductDetail item={item} onAdd={callbacks.addToBasket} />
		</Layout>
	);
}

export default React.memo(Product);
