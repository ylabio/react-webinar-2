import List from "../../components/list";
import Layout from "../../components/layout";
import React, { useCallback, useEffect } from "react";
import Item from "../../components/item";
import useStore from "../../utils/use-store";
import useSelector from "../../utils/use-selector";
import Pagination from "../../components/pagination/pagination";
import { MenuBasker } from "../../components/menu-basker";

function Main({ }) {

  console.log('Main');

  const store = useStore();

  const select = useSelector(state => ({
    items: state.catalog.items,
    amount: state.basket.amount,
    sum: state.basket.sum,
    page: state.catalog.pageSelected,
    pagesCount: state.catalog.pagesCount,
  }));

  useEffect(() => {
    store.get('catalog').load();
  }, [])

  const callbacks = {
    // Открытие корзины
    openModalBasket: useCallback(() => store.get('modals').open('basket'), []),
    // Добавление в корзину
    addToBasket: useCallback(_id => store.get('basket').addToBasket(_id), []),
    onPageChange: useCallback(number => store.get('catalog').onPageChange(number), []),
  };

  const renders = {
    item: useCallback(item => <Item item={item} onAdd={callbacks.addToBasket} />, []),
  }

  return (
    <Layout head={<h1>Магазин</h1>}>
      <MenuBasker onOpen={callbacks.openModalBasket} amount={select.amount} sum={select.sum}
      />
      <List items={select.items} renderItem={renders.item} />
      <Pagination
        currentPage={select.page}
        pagesCount={select.pagesCount}
        onPageChange={callbacks.onPageChange}
      />
    </Layout>
  )
}

export default React.memo(Main);
