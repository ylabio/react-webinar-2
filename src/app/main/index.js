import BasketSimple from "../../components/basket-simple";
import List from "../../components/list";
import Layout from "../../components/layout";
import React, {useCallback, useEffect} from "react";
import Item from "../../components/item";
import Pagination from "../../components/pagination";
import Loader from "../../components/loader";
import useStore from "../../utils/use-store";
import useSelector from "../../utils/use-selector";
import Controls from "../../components/controls";
import LanguageSelect from '../../components/language-select';
import TranslateText from "../../components/translate-text";

function Main(){

  console.log('Main');

  const store = useStore();

  const select = useSelector(state => ({
    items: state.catalog.items,
		isLoading: state.catalog.isLoading,
		limit: state.catalog.limit,
		pagesCount: state.catalog.pagesCount,
		currPage: state.catalog.currPage,
    amount: state.basket.amount,
    sum: state.basket.sum,
		currLanguage: state.language.currLanguage
  }));

	useEffect(() => {
		const skip = select.currPage === 1 ? 0 : (select.currPage - 1) * select.limit;
    store.get('catalog').load(select.limit, skip);
  }, [select.currPage])

  const callbacks = {
    // Открытие корзины
    openModalBasket: useCallback(() => store.get('modals').open('basket'), []),
    // Добавление в корзину
    addToBasket: useCallback(_id => store.get('basket').addToBasket(_id), []),

		setCurrPage: useCallback(page => store.get('catalog').setCurrPage(page), []),

		setCurrLanguage: useCallback(language => store.get('language').setCurrLanguage(language), []),
  };

  const renders = {
    item: useCallback(item => <Item item={item} onAdd={callbacks.addToBasket} pathLink="article"/>, []),
  }

  return (
    <Layout head={<h1><TranslateText tid="shop" /></h1>}>
			<Controls>
				<LanguageSelect currLanguage={select.currLanguage} setCurrLanguage={callbacks.setCurrLanguage} />
				<BasketSimple onOpen={callbacks.openModalBasket} amount={select.amount} sum={select.sum}/>
			</Controls>
			{select.isLoading ? 
				<Loader /> : 
				<>
          <List items={select.items} renderItem={renders.item}/>
          <Pagination pagesCount={select.pagesCount} currPage={select.currPage} setCurrPage={callbacks.setCurrPage}/>
				</>
			}
    </Layout>
  )
}

export default React.memo(Main);
