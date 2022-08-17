import List from "../../components/list";
import Layout from "../../components/layout";
import React, { useCallback, useEffect, useState } from "react";
import Item from "../../components/item";
import useStore from "../../utils/use-store";
import useSelector from "../../utils/use-selector";
import getAmountOfPage from "../../utils/amount-pages";
import Pagination from "../../components/pagination";
import getPaginationArray from "../../utils/pagination-array";
import translate from "../../utils/translate";
import MenuBasket from "../../components/menu-basket";
import Header from "../../components/header";

function Main() {

  const select = useSelector(state => ({
    items: state.catalog.items,
    amount: state.basket.amount,
    sum: state.basket.sum,
    count: state.catalog.count,
    page: state.catalog.page,
    limit: state.catalog.limit,
    language: state.language.lang
  }));

  const [page, setPage] = useState(1);
  const pagePagination = getAmountOfPage(select.count, select.limit);
  const paginationArray = getPaginationArray(pagePagination);

  const store = useStore();

  useEffect(() => {
    store.get('catalog').load(page);
  }, [page])

  const callbacks = {
    // Открытие корзины
    openModalBasket: useCallback(() => store.get('modals').open('basket'), []),
    // Добавление в корзину
    addToBasket: useCallback(_id => store.get('basket').addToBasket(_id), []),
    // Изменение страницы
    setPagePagination: useCallback(page => {
      setPage(page)
    }, []),
    // Изменение языка
    setLanguage: useCallback(lang => store.get('language').setLang(lang), [])
  };

  const renders = {
    item: useCallback(item => <Item item={item} onAdd={callbacks.addToBasket} addsQuery='article' closeModal={callbacks.closeModal} lang={select.language} />, [select.language]),
  }

  return (
    <Layout head={
      <Header title={translate(select.language, 'Магазин')} changeLang={callbacks.setLanguage} lang={select.language} />
    }>
      <MenuBasket openModal={callbacks.openModalBasket} amount={select.amount} sum={select.sum} lang={select.language} />
      <List items={select.items} renderItem={renders.item} />
      <Pagination currentPage={page} pages={paginationArray} setPage={callbacks.setPagePagination} />
    </Layout>
  )
}

export default React.memo(Main);