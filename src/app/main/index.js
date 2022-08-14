import BasketSimple from "../../components/basket-simple";
import List from "../../components/list";
import Layout from "../../components/layout";
import React, { useCallback, useEffect } from "react";
import Item from "../../components/item";
import useStore from "../../utils/use-store";
import useSelector from "../../utils/use-selector";
import Pagination from "../../components/pagination";
import Preloader from "../../components/preloader";

function Main() {
  console.log("Main");

  const store = useStore();

  const select = useSelector((state) => ({
    items: state.catalog.items,
    amount: state.basket.amount,
    sum: state.basket.sum,
    maxPages: state.catalog.maxPages,
    currentPage: state.catalog.page,
    request: state.catalog.request,
  }));

  useEffect(() => {
    store.get("catalog").load();
  }, [select.currentPage]);

  const callbacks = {
    // Открытие корзины
    openModalBasket: useCallback(() => store.get("modals").open("basket"), []),
    // Добавление в корзину
    addToBasket: useCallback((_id) => store.get("basket").addToBasket(_id), []),

    setPage: useCallback((page) => store.get("catalog").setPage(page), []),
  };

  const renders = {
    item: useCallback((item) => <Item item={item} onAdd={callbacks.addToBasket} />, []),
  };

  return (
    <Layout head={<h1 lang="ru">Магазин</h1>}>
      <BasketSimple onOpen={callbacks.openModalBasket} amount={select.amount} sum={select.sum} />
      <List items={select.items} renderItem={renders.item} />
      <Pagination maxPages={select.maxPages} onSetPage={callbacks.setPage} currentPage={select.currentPage} />
    </Layout>
  );
}

export default React.memo(Main);
