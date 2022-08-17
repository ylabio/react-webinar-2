import BasketSimple from "../../components/basket-simple";
import List from "../../components/list";
import Layout from "../../components/layout";
import React, { useCallback, useEffect, useState } from "react";
import Item from "../../components/item";
import useStore from "../../utils/use-store";
import useSelector from "../../utils/use-selector";
import Pagination from "../../components/pagination";
import Select from "../../components/select";
import LoaderComponent from "../../components/loader-component";
import LayoutMenu from "../../components/layout-menu";
import Navbar from "../../components/navbar";
import useTranslate from "../../utils/use-translate";

function Main() {
  console.log("Main");

  const store = useStore();
  const [isLoading, setIsLoading] = useState(true);
  const t = (phrase) => useTranslate(phrase);

  const load = async function (page) {
    setIsLoading(true);
    await store
      .get("catalog")
      .load(page)
      .then(() => {
        setIsLoading(false);
      });
  };

  useEffect(() => {
    load(select.currentPage);
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
    changePage: useCallback((page) => load(page), []),
    changeLang: useCallback((lang) => {
      store.get("language").loadLang(lang);
    }, []),
  };

  const renders = {
    item: useCallback(
      (item) => <Item item={item} onAdd={callbacks.addToBasket} />,
      [select.lang]
    ),
  };

  return (
    <Layout
      head={
        <>
          <h1>{t("main.storeHead")}</h1>
          <Select
            currentValue={select.lang.currentLang}
            options={select.lang.langs}
            changeOption={callbacks.changeLang}
          />
        </>
      }
    >
      <LayoutMenu>
        <Navbar />
        <BasketSimple
          onOpen={callbacks.openModalBasket}
          amount={select.amount}
          sum={select.sum}
        />
      </LayoutMenu>
      {isLoading ? (
        <LoaderComponent />
      ) : (
        <>
          <List items={select.items} renderItem={renders.item} />
          <Pagination
            totalPages={select.pagesCount}
            currentPage={select.currentPage}
            changePage={callbacks.changePage}
          />
        </>
      )}
    </Layout>
  );
}

export default React.memo(Main);
