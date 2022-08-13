import BasketSimple from "../../components/basket-simple";
import List from "../../components/list";
import Layout from "../../components/layout";
import React, { useCallback, useEffect } from "react";
import Item from "../../components/item";
import Pagination from "../../components/pagination";
import useStore from "../../utils/use-store";
import useSelector from "../../utils/use-selector";

function Main() {
  console.log("Main");

  const store = useStore();

  const select = useSelector((state) => ({
    items: state.catalog.items,
    amount: state.basket.amount,
    sum: state.basket.sum,
    allPage: state.catalog.count,
    num: state.numpag.num,
  }));

  useEffect(() => {
    store.get("catalog").load();
  }, []);

  useEffect(() => {
    if (select.num > 0 && !select.items[select.num]) {
      store.get("catalog").loading(select.num);
    }
  }, [select.num]);

  console.log("num", select.num);

  const callbacks = {
    // Открытие корзины
    openModalBasket: useCallback(() => store.get("modals").open("basket"), []),
    // Добавление в корзину
    addToBasket: useCallback((_id) => store.get("basket").addToBasket(_id), []),
    // Смена страницы
    newPage: useCallback((n) => store.get("numpag").newPage(n), []),
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
      />
      <List items={select.items[select.num]} renderItem={renders.item} />
      {select.allPage && (
        <Pagination
          allPage={select.allPage}
          pag={select.num}
          newPage={callbacks.newPage}
        />
      )}
    </Layout>
  );
}

export default React.memo(Main);
