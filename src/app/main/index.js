import BasketSimple from "../../components/basket-simple";
import List from "../../components/list";
import Layout from "../../components/layout";
import React, { useCallback } from "react";
import Item from "../../components/item";
import useStore from "../../utils/use-store";
import useSelector from "../../utils/use-selector";
import Pagination from "../../components/pagination";

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
      (item) => <Item item={item} onAdd={callbacks.addToBasket} />,
      []
    ),
  };

  return (
    <Layout head={<h1>Магазин</h1>}>
      <BasketSimple
        onOpen={callbacks.openModalBasket}
        amount={select.amount}
        sum={select.sum}
        firstPage={callbacks.firstPage}
      />
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
