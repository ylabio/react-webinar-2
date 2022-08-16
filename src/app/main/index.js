import BasketSimple from "../../components/basket-simple";
import List from "../../components/list";
import Layout from "../../components/layout";
import React, { useCallback, useEffect } from "react";
import Item from "../../components/item";
import useStore from "../../utils/use-store";
import useSelector from "../../utils/use-selector";
import Pagination from "../../components/pagination";
import Header from "../../components/header";
import Navbar from "../../components/navbar";
import { routes } from "../../utils/routes";

function Main() {
  const store = useStore();

  const select = useSelector((state) => ({
    items: state.catalog.items,
    count: state.catalog.count,
    pageSize: state.catalog.pageSize,
    pageCurrent: state.catalog.pageCurrent,
    amount: state.basket.amount,
    sum: state.basket.sum,
  }));

  useEffect(() => {
    store.get("catalog").load(select.pageCurrent, select.pageSize);
  }, [select.pageCurrent, select.pageSize]);

  const callbacks = {
    // Открытие корзины
    openModalBasket: useCallback(() => store.get("modals").open("basket"), []),
    // Добавление в корзину
    addToBasket: useCallback((_id) => store.get("basket").addToBasket(_id), []),
    // Переключатель страниц
    pageChanged: useCallback(
      (numberPage) => store.get("catalog").pageChanged(numberPage),
      []
    ),
    //Переключение на первую страницу
    firstPage: useCallback((_id) => store.get("catalog").pageChanged(1), []),
  };

  const renders = {
    item: useCallback(
      (item) => (
        <Item
          item={item}
          onAdd={callbacks.addToBasket}
          productPageLink={`${routes.productPage}/${item._id}`}
        />
      ),
      []
    ),
  };

  return (
    <Layout head={<h1>Магазин</h1>}>
      <Header>
        <Navbar firstPage={callbacks.firstPage} />
        <BasketSimple
          onOpen={callbacks.openModalBasket}
          amount={select.amount}
          sum={select.sum}
          firstPage={callbacks.firstPage}
        />
      </Header>
      <List items={select.items} renderItem={renders.item} />
      <Pagination
        countTotal={select.count}
        pageSize={select.pageSize}
        pageCurrent={select.pageCurrent}
        pageChanged={callbacks.pageChanged}
      />
    </Layout>
  );
}

export default React.memo(Main);
