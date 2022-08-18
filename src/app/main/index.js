import BasketSimple from "../../components/basket-simple";
import List from "../../components/list";
import Layout from "../../components/layout";
import React, { useCallback, useEffect } from "react";
import Spinner from "../../components/spinner";
import Item from "../../components/item";
import PanelLanguage from "../../components/panel-language";
import Menu from "../../components/menu";
import Pagination from "../../components/pagination";
import useStore from "../../utils/use-store";
import useSelector from "../../utils/use-selector";
import { translation } from "../../utils/language-array";

function Main() {
  console.log("Main");

  const store = useStore();

  const select = useSelector((state) => ({
    items: state.catalog.items,
    loading: state.catalog.loading,
    error: state.catalog.error,
    amount: state.basket.amount,
    sum: state.basket.sum,
    allPage: state.catalog.count,
    num: state.catalog.num,
    language: state.language.num,
  }));

  useEffect(() => {
    store.get("catalog").load();
  }, []);

  useEffect(() => {
    if (select.num > 0 && !select.items[select.num]) {
      store.get("catalog").loading(select.num);
    }
  }, [select.num]);

  const callbacks = {
    // Открытие корзины
    openModalBasket: useCallback(() => store.get("modals").open("basket"), []),
    // Добавление в корзину
    addToBasket: useCallback((_id) => store.get("basket").addToBasket(_id), []),
    // Смена страницы
    newPage: useCallback((n) => store.get("catalog").newPage(n), []),
    // Смена языка
    changeLanguage: useCallback(
      () => store.get("language").changeLanguage(),
      []
    ),
  };

  const renders = {
    item: useCallback(
      (item) => (
        <Item item={item} onAdd={callbacks.addToBasket} address={"article"} />
      ),
      []
    ),
  };

  const text = (n) => {
    return translation(select.language, n);
  };

  if (select.loading) {
    return <Spinner />;
  }

  return (
    <Layout
      head={<h1>{text("shop")}</h1>}
      language={
        <PanelLanguage
          changeLanguage={callbacks.changeLanguage}
          language={select.language}
        />
      }
    >
      <BasketSimple
        onOpen={callbacks.openModalBasket}
        amount={select.amount}
        sum={select.sum}
        text={[text("go"), text("in_the_basket"), text("empty")]}
      />

      <Menu links={[{ link: "/", title: text("main") }]} />

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
