import BasketSimple from "../../components/basket-simple";
import List from "../../components/list";
import Layout from "../../components/layout";
import React, { useCallback, useEffect } from "react";
import Item from "../../components/item";
import useStore from "../../utils/use-store";
import useSelector from "../../utils/use-selector";
import Pagination from "../../components/pagination";
import { Routes, Route, useLocation } from "react-router-dom";
import ItemDescription from "../../components/item-description";

function Main() {
  console.log("Main");

  const store = useStore();
  const [pagination, setPagination] = React.useState(1);

  const [item, setItem] = React.useState({});

  useEffect(() => {
    store.get("catalog").load(pagination);
  }, [pagination]);

  const select = useSelector((state) => ({
    items: state.catalog.items,
    amount: state.basket.amount,
    sum: state.basket.sum,
  }));

  const callbacks = {
    // Открытие корзины
    openModalBasket: useCallback(() => store.get("modals").open("basket"), []),
    // Добавление в корзину
    addToBasket: useCallback((_id) => store.get("basket").addToBasket(_id), []),
  };

  const renders = {
    item: useCallback(
      (item) => <Item item={item} onAdd={callbacks.addToBasket} />,
      []
    ),
  };

  return (
    <Routes>
      <Route
        path="/"
        element={
          <Layout head={<h1>Магазин</h1>}>
            <BasketSimple
              onOpen={callbacks.openModalBasket}
              amount={select.amount}
              sum={select.sum}
            />
            <List items={select.items} renderItem={renders.item} />

            <Pagination pagination={pagination} setPagination={setPagination} />
          </Layout>
        }
      />
      <Route
        path="/:id"
        element={
          <Layout head={<h1>{item.title}</h1>}>
            <BasketSimple
              onOpen={callbacks.openModalBasket}
              amount={select.amount}
              sum={select.sum}
            />
            <ItemDescription
              item={item}
              setItem={setItem}
              onAdd={callbacks.addToBasket}
            />
          </Layout>
        }
      />
    </Routes>
  );
}

export default React.memo(Main);
