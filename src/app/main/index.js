import BasketSimple from "../../components/basket-simple";
import List from "../../components/list";
import Layout from "../../components/layout";
import React, { useCallback, useEffect } from "react";
import Item from "../../components/item";
import useStore from "../../utils/use-store";
import useSelector from "../../utils/use-selector";
import Pagination from "../../components/pagination";
import Spinner from "../../components/spinner";

function Main() {
  console.log("Main");

  const store = useStore();

  const select = useSelector((state) => ({
    items: state.catalog.items,
    isLoading: state.catalog.isLoading,
    amount: state.basket.amount,
    sum: state.basket.sum,
    currentPage: state.catalog.currentPage,
    pageCount: state.catalog.pageCount,
  }));
  useEffect(() => {
    store.get("catalog").load();
  }, [select.currentPage]);

  const callbacks = {
    // Открытие корзины
    openModalBasket: useCallback(() => store.get("modals").open("basket"), []),
    // Добавление в корзину
    addToBasket: useCallback((_id) => store.get("basket").addToBasket(_id), []),

    changePage: useCallback(
      (page) => () => store.get("catalog").changePage(page),
      []
    ),
    itemIdChange: useCallback(
      (page) => () => store.get("item").itemIdChange(page),
      []
    ),
  };

  const renders = {
    item: useCallback(
      (item) => (
        <Item
          item={item}
          onAdd={callbacks.addToBasket}
          itemIdChange={callbacks.itemIdChange}
        />
      ),
      []
    ),
  };
  console.log();
  return (
    <Layout head={<h1>Магазин</h1>}>
      <BasketSimple
        onOpen={callbacks.openModalBasket}
        amount={select.amount}
        sum={select.sum}
      />
      {select.isLoading ? <Spinner /> : null}
      <List items={select.items} renderItem={renders.item} />
      <Pagination
        pageCount={select.pageCount}
        currentPage={select.currentPage}
        changePage={callbacks.changePage}
      />
    </Layout>
  );
}

export default React.memo(Main);
