import BasketSimple from "../../components/basket-simple";
import List from "../../components/list";
import Layout from "../../components/layout";
import React, {useCallback, useEffect} from "react";
import Item from "../../components/item";
import Pagination from "../../components/pagination";
import useStore from "../../utils/use-store";
import useSelector from "../../utils/use-selector";

function Main(){

  console.log('Main');

  const store = useStore();

  const select = useSelector(state => ({
    items: state.catalog.items,
		limit: state.catalog.limit,
		pagesCount: state.catalog.pagesCount,
		currPage: state.catalog.currPage,
    amount: state.basket.amount,
    sum: state.basket.sum
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

		setCurrPage: useCallback(page => store.get('catalog').setCurrPage(page), [])
  };

  const renders = {
    item: useCallback(item => <Item item={item} onAdd={callbacks.addToBasket}/>, []),
  }

  return (
    <Layout head={<h1>Магазин</h1>}>
      <BasketSimple onOpen={callbacks.openModalBasket} amount={select.amount} sum={select.sum}/>
      <List items={select.items} renderItem={renders.item}/>
			<Pagination pagesCount={select.pagesCount} currPage={select.currPage} setCurrPage={callbacks.setCurrPage}/>
    </Layout>
  )
}

export default React.memo(Main);
