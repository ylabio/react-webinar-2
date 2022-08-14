import React, {useCallback, useEffect} from "react";
import BasketSimple from '../../components/basket-simple';
import Layout from '../../components/layout';
import List from "../../components/list";
import Item from "../../components/item";
import Pagination from "../../components/pagination";
import useSelector from "../../utils/use-selector";
import useStore from '../../utils/use-store';

function HomePage(){
	const store = useStore();

  const select = useSelector(state => ({
		amount: state.basket.amount,
		sum: state.basket.sum,
    items: state.catalog.items,
    page: state.catalog.pagination.page
  }));

	useEffect(() => {
		store.get('catalog').load();
	}, [select.page])

  const callbacks = {
    // Добавление в корзину
    addToBasket: useCallback(_id => store.get('basket').addToBasket(_id), []),
		openModalBasket: useCallback(() => store.get('modals').open('basket'), []),
  };

  const renders = {
    item: useCallback(item => <Item item={item} onAdd={callbacks.addToBasket}/>, []),
  }

  return (
			<Layout head={<h1>Магазин</h1>}>
				<BasketSimple onOpen={callbacks.openModalBasket} amount={select.amount} sum={select.sum}/>
				<List items={select.items} renderItem={renders.item}/>
				<Pagination />
			</Layout>
  )
}

export default React.memo(HomePage);
