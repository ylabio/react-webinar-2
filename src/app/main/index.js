import List from "../../components/list";
import Layout from "../../components/layout";
import React, {useCallback, useEffect, useMemo, useState} from "react";
import Item from "../../components/item";
import useStore from "../../utils/use-store";
import useSelector from "../../utils/use-selector";
import Pagination from "../../components/pagination";
import { localize } from "../../utils/localize";
import { useNavigate, useParams } from "react-router-dom";
import PageMessage from "../../components/page-message";
import Header from "../../components/header";
import Language from "../../components/language";

function Main(){

  console.log('Main');

  const store = useStore();

	const { pageIndex = 1 } = useParams();
	const navigate = useNavigate();

	const [limit] = useState(10);
	const [skip, setSkip] = useState(0);

	useEffect(() => {
		setSkip(limit * (Number(pageIndex) - 1))
	}, [pageIndex])

	useMemo(() => {
		store.get('catalog').load(limit, skip);
	}, [skip]);

  const select = useSelector(state => ({
		amount: state.basket.amount,
		sum: state.basket.sum,
    items: state.catalog.items,
    count: state.catalog.count,
    pageCount: state.catalog.pageCount,
    currentPage: state.catalog.currentPage,
		language: state.localization.language,
		loading: state.catalog.loading,
  }));

  const callbacks = {
    // Добавление в корзину
    addToBasket: useCallback(_id => store.get('basket').addToBasket(_id), []),
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

  const renders = {
    item: useCallback(item => <Item item={item} onAdd={callbacks.addToBasket} language={select.language} link={`/articles/${item._id}`} />, [select.language]),
  }

  return (
    <Layout
			head={<h1>{localize['Магазин'][select.language]}</h1>}
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
			{select.loading ? (
				<PageMessage>{localize['Загрузка'][select.language]}...</PageMessage>
			) : select.items.length > 0 ? (
				<>
					<List items={select.items} renderItem={renders.item} />
					<Pagination
						limit={limit}
						pageCount={select.pageCount}
						currentPage={select.currentPage}
						setSkip={setSkip}
						navigate={navigate}
					/>
				</>
			) : (
				<PageMessage>{localize['Не найдено'][select.language]}</PageMessage>
			)}
		</Layout>
  )
}

export default React.memo(Main);
