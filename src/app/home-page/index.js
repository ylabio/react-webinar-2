import React, {useCallback, useEffect} from "react";
import BasketSimple from '../../components/basket-simple';
import Layout from '../../components/layout';
import List from "../../components/list";
import Item from "../../components/item";
import Pagination from "../../components/pagination";
import { dictionaryEnum } from '../../enums/dictionaryEnum';
import useSelector from "../../utils/use-selector";
import useStore from '../../utils/use-store';

function HomePage(){
	const store = useStore();

  const select = useSelector(state => ({
	  amount: state.basket.amount,
	  sum: state.basket.sum,
    items: state.catalog.items,
    page: state.catalog.pagination.page,
    lang: state.common.language,
		total: state.catalog.pagination.total
  }));

  useEffect(() => {
    store.get('catalog').load();
  }, [select.page, select.lang])

  const callbacks = {
    // Добавление в корзину
    addToBasket: useCallback(_id => store.get('basket').addToBasket(_id), []),
    openModalBasket: useCallback(() => store.get('modals').open('basket'), []),
		setPage: useCallback(e => {store.get('catalog').setPage(e.target.getAttribute('data-number'))}, []),
  };

  const renders = {
    item: useCallback(item => <Item item={item} onAdd={callbacks.addToBasket}/>, []),
  }

  return (
	  <Layout head={<h1>{dictionaryEnum.store[select.lang]}</h1>}>
		  <BasketSimple onOpen={callbacks.openModalBasket} amount={select.amount} sum={select.sum} lang={select.lang} />
		  <List items={select.items} renderItem={renders.item} />
		  <Pagination page={select.page} total={select.total} setPage={callbacks.setPage} />
	  </Layout>
  )
}

export default React.memo(HomePage);
