import BasketSimple from "../../components/basket-simple";
import List from "../../components/list";
import Layout from "../../components/layout";
import React, { useCallback, useEffect } from "react";
import Item from "../../components/item";
import useStore from "../../utils/use-store";
import useSelector from "../../utils/use-selector";
import Pagination from "../../components/pagination";

function Main() {
  // console.log("Main");

  const store = useStore();

  useEffect(() => {
    store.get("catalog").load(1);
  }, []);

  const select = useSelector((state) => ({
    items: state.catalog.items,
    amount: state.basket.amount,
    sum: state.basket.sum,
    current_page: state.catalog.current_page,
    last_page: state.catalog.pages,
  }));

  const callbacks = {
    // Открытие корзины
    openModalBasket: useCallback(() => store.get("modals").open("basket"), []),
    // Добавление в корзину
    addToBasket: useCallback((_id) => store.get("basket").addToBasket(_id), []),
    loadNewPage: useCallback((numb) => store.get("catalog").load(numb)),
  };

  const renders = {
    item: useCallback(
      (item) => (
        <Item
          item={item}
          onAdd={callbacks.addToBasket}
          articleUrl={`/article/${item._id}`}
        />
      ),
      []
    ),
  };

  return (
    <Layout head={<h1>Магазин</h1>}>
      <BasketSimple
        onOpen={callbacks.openModalBasket}
        amount={select.amount}
        sum={select.sum}
      />
      <List items={select.items} renderItem={renders.item} />
      <Pagination
        onLoadNewPage={callbacks.loadNewPage}
        current_page={select.current_page}
        last_page={select.last_page}
      />
    </Layout>
  );
}

export default React.memo(Main);
