import BasketSimple from "../../components/basket-simple";
import List from "../../components/list";
import Layout from "../../components/layout";
import React, {useCallback, useEffect} from "react";
import Item from "../../components/item";
import useStore from "../../utils/use-store";
import useSelector from "../../utils/use-selector";
import Pagination from "../../components/pagination";
import Loader from "../../components/loader";

function Main(){

  console.log('Main');

  const store = useStore();
  const select = useSelector(state => ({
    items: state.catalog.items,
    total: state.catalog.total,
    amount: state.basket.amount,
    sum: state.basket.sum,
    current: state.pagination.current,
    skip: state.pagination.skip,
    limit: state.pagination.limit,
  }));

  useEffect(() => {
    store.get('catalog').load(select.skip, select.limit);
  }, [select.skip, select.limit]);

  const callbacks = {
    // Открытие корзины
    openModalBasket: useCallback(() => store.get('modals').open('basket'), []),
    // Добавление в корзину
    addToBasket: useCallback(id => store.get('basket').addToBasket(id), []),
    changePage: useCallback(page => store.get('pagination').changePage(page), []),
  };

  const renders = {
    item: useCallback(item => <Item item={item} onAdd={callbacks.addToBasket}/>, []),
  }

  return (
    <Layout head={<h1>Магазин</h1>}>
      <BasketSimple onOpen={callbacks.openModalBasket} amount={select.amount} sum={select.sum}/>
      {select.items.length ?
      <>
        <List items={select.items} renderItem={renders.item}/>
        <Pagination itemsNumber={select.total}
                    currentPage={select.current}
                    itemsPerPage={select.limit}
                    onChange={callbacks.changePage} />
      </> : <Loader />}
    </Layout>
  )
}

export default React.memo(Main);
