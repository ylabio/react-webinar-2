import List from "../../components/list";
import Layout from "../../components/layout";
import React, {useCallback, useEffect} from "react";
import Item from "../../components/item";
import useStore from "../../utils/use-store";
import useSelector from "../../utils/use-selector";
import Paginator from "../../components/paginator";
import Sidebar from "../../components/sidebar";




function Main(){

  console.log('Main');

  const store = useStore();

  const select = useSelector(state => ({
    items: state.catalog.items,
    amount: state.basket.amount,
    sum: state.basket.sum,
    count: state.catalog.count,
    currentPage: state.catalog.currentPage,
  }));

  const callbacks = {
    // Открытие корзины
    openModalBasket: useCallback(() => store.get('modals').open('basket'), []),
    // Добавление в корзину
    addToBasket: useCallback(_id => store.get('basket').addToBasket(_id), []),
    load: useCallback((limit, skip) => store.get('catalog').load(limit, skip), []),
    changePage: useCallback(num => store.get('catalog').changePage(num), [])
    
  };

  const renders = {
    item: useCallback(item => <Item item={item} onAdd={callbacks.addToBasket} link={`article/${item._id}`}/>, []),
  }

  return (
    <Layout head={<h1>Магазин</h1>}>
      <Sidebar onOpen={callbacks.openModalBasket} amount={select.amount} sum={select.sum}/>
      <List items={select.items} renderItem={renders.item}/>
      <Paginator count={select.count}
                 currentPage={select.currentPage}
                 load={callbacks.load}
                 changePage={callbacks.changePage}
                 />
    </Layout>
  )
}

export default React.memo(Main);
