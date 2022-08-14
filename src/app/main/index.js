import BasketSimple from "../../components/basket-simple";
import List from "../../components/list";
import Layout from "../../components/layout";
import React, { useCallback, useEffect } from "react";
import Item from "../../components/item";
import useStore from "../../utils/use-store";
import useSelector from "../../utils/use-selector";
import Pagination from "../../components/pagination";
import Select from "../../components/select";

function Main() {
  console.log("Main");

  const store = useStore();
  useEffect(() => {
    store.get("catalog").load(select.currentPage);
  }, []);

  const select = useSelector((state) => ({
    items: state.catalog.items,
    amount: state.basket.amount,
    sum: state.basket.sum,
    pagesCount: state.catalog.pagesCount,
    currentPage: state.catalog.currentPage,
    skip: state.catalog.skip,
    lang: state.language,
  }));

  const callbacks = {
    // Открытие корзины
    openModalBasket: useCallback(() => store.get("modals").open("basket"), []),
    // Добавление в корзину
    addToBasket: useCallback((_id) => store.get("basket").addToBasket(_id), []),
    // Переключение страницы
    changePage: useCallback((page) => store.get("catalog").load(page), []),
    changeLang: useCallback((lang) => {
      store.get("language").loadLang(lang);
    }, []),
  };

  const renders = {
    item: useCallback(
      (item) => (
        <Item
          item={item}
          onAdd={callbacks.addToBasket}
          translate={select.lang.translate}
        />
      ),
      [select.lang]
    ),
  };

  return (
    <Layout
      head={
        <>
          <h1>Магазин</h1>
          <Select
            currentValue={select.lang.translate.lang}
            options={select.lang.langs}
            changeOption={callbacks.changeLang}
          />
        </>
      }
    >
      <BasketSimple
        translate={select.lang.translate}
        onOpen={callbacks.openModalBasket}
        amount={select.amount}
        sum={select.sum}
      />
      <List items={select.items} renderItem={renders.item} />
      <Pagination
        totalPages={select.pagesCount}
        currentPage={select.currentPage}
        changePage={callbacks.changePage}
      />
    </Layout>
  );
}

export default React.memo(Main);
