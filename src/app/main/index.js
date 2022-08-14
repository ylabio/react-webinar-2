import BasketSimple from "../../components/basket-simple";
import List from "../../components/list";
import Layout from "../../components/layout";
import React, { useCallback } from "react";
import Item from "../../components/item";
import useStore from "../../utils/use-store";
import useSelector from "../../utils/use-selector";
import Pagination from "../../components/pagination";
import useLanguage from "../../utils/use-language";
import usePageState from "../../utils/use-pageState";

function Main() {
  const store = useStore();
  const langPackage = useLanguage();
  const [page, setPage] = usePageState(store);

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
    setPage: useCallback((p) => setPage(p), []),
  };

  const renders = {
    item: useCallback(
      (item) => (
        <Item
          item={item}
          onAdd={callbacks.addToBasket}
          lang={langPackage.buttons}
        />
      ),
      [langPackage]
    ),
  };

  return (
    <Layout head={<h1>{langPackage.title}</h1>}>
      <BasketSimple
        onOpen={callbacks.openModalBasket}
        amount={select.amount}
        sum={select.sum}
        lang={langPackage.basketSimple}
      />

      <List items={select.items} renderItem={renders.item} />

      {!!select.items.length && (
        <Pagination {...{ page, setPage: callbacks.setPage }} />
      )}
    </Layout>
  );
}

export default React.memo(Main);
