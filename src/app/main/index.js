import React, { useCallback, useEffect, useState } from "react";
import useSelector from "../../utils/use-selector";
import useStore from "../../utils/use-store";
import Layout from "../../components/layout";
import BasketSimple from "../../components/basket-simple";
import List from "../../components/list";
import Pagination from "../../components/pagination";
import Item from "../../components/item";
import Menu from "../../components/Menu";

function Main() {
  const store = useStore();
  useEffect(() => {
    store.get("catalog").load();
  }, []);

  const select = useSelector((state) => {
    return {
      items: state.catalog.items,
      allPages: state.catalog.allPages,
      amount: state.basket.amount,
      sum: state.basket.sum,
      currentPage: state.catalog.currentPage,
    };
  });
  const [currentPage, setCurrentPage] = useState(select.currentPage);
  useEffect(() => {
    store.get("catalog").getPage(currentPage);
  }, [currentPage]);

  const callbacks = {
    // Открытие корзины
    openModalBasket: useCallback(() => store.get("modals").open("basket"), []),
    // Добавление в корзину
    addToBasket: useCallback((_id) => store.get("basket").addToBasket(_id), []),
  };

  const renders = {
    item: useCallback(
      (item) => <Item item={item} onAdd={callbacks.addToBasket} url={`/item?id=${item._id}`}/>,
      []
    ),
  };

  return (
    <Layout head={<h1>Магазин</h1>}>
      <Menu
        onOpen={callbacks.openModalBasket}
        amount={select.amount}
        sum={select.sum}
      />
      {/* <BasketSimple
        onOpen={callbacks.openModalBasket}
        amount={select.amount}
        sum={select.sum}
      /> */}
      <List items={select.items} renderItem={renders.item} />
      <Pagination
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        allPages={select.allPages}
      />
    </Layout>
  );
}

export default React.memo(Main);
