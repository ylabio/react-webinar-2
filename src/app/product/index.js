import React, { useCallback, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Header from '../../components/header';
import Language from '../../components/language';
import Layout from '../../components/layout';
import ProductDetail from '../../components/product-detail';
import useSelector from '../../utils/use-selector';
import useStore from '../../utils/use-store';

function Product() {
	const { id } = useParams();

	const store = useStore();

	useEffect(() => {
		store.get('product').load(id);
		return () => {
			store.get('product').reset();
		};
	}, [id]);

	const select = useSelector((state) => ({
		amount: state.basket.amount,
		sum: state.basket.sum,
		item: state.product.item,
		language: state.localization.language,
	}));

	const callbacks = {
		// Добавление в корзину
		addToBasket: useCallback((_id) => store.get('basket').addToBasket(_id), []),
		openModalBasket: useCallback(() => store.get('modals').open('basket'), []),
		onLanguageRu: useCallback(
			() => store.get('localization').changeLanguage('ru'),
			[],
		),
    onLanguageEn: useCallback(
			() => store.get('localization').changeLanguage('en'),
			[],
		),
    onLanguageIt: useCallback(
			() => store.get('localization').changeLanguage('it'),
			[],
		),
	};

	return (
		<Layout
			head={<h1>{select.item && select.item.title}</h1>}
			language={
				<Language
					onLanguageRu={callbacks.onLanguageRu}
					onLanguageEn={callbacks.onLanguageEn}
					onLanguageIt={callbacks.onLanguageIt}
					currentLanguage={select.language}
				/>
			}
		>
			<Header
				language={select.language}
				onOpen={callbacks.openModalBasket}
				amount={select.amount}
				sum={select.sum}
			/>
			{select.item && (
				<ProductDetail
					item={select.item}
					onAdd={callbacks.addToBasket}
					language={select.language}
				/>
			)}
		</Layout>
	);
}

export default React.memo(Product);
