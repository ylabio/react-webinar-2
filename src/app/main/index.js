import List from "../../components/list";
import Layout from "../../components/layout";
import React, { useCallback, useEffect, useState } from "react";
import Item from "../../components/item";
import useStore from "../../utils/use-store";
import useSelector from "../../utils/use-selector";
import getAmountOfPage from "../../utils/amount-pages";
import Pagination from "../../components/pagination";
import getPaginationArray from "../../utils/pagination-array";
import MenuBasket from "../../components/menu-basket";

function Main() {

  const select = useSelector(state => ({
    items: state.catalog.items,
    amount: state.basket.amount,
    sum: state.basket.sum,
    count: state.catalog.count,
    page: state.catalog.page
  }));

  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);
  const pagePagination = getAmountOfPage(select.count, limit);
  const paginationArray = getPaginationArray(pagePagination);

  const store = useStore();

  useEffect(() => {
    store.get('catalog').load(limit, page);
  }, [page])

  const callbacks = {
    // Открытие корзины
    openModalBasket: useCallback(() => store.get('modals').open('basket'), []),
    // Добавление в корзину
    addToBasket: useCallback(_id => store.get('basket').addToBasket(_id), []),
    // Изменение страницы
    setPagePagination: useCallback(page => {
      setPage(page)
    }, [])
  };

  const renders = {
    item: useCallback(item => <Item item={item} onAdd={callbacks.addToBasket} addsQuery='article' />, []),
  }

  return (
    <Layout head={<h1>Магазин</h1>}>
      <MenuBasket openModal={callbacks.openModalBasket} items={select} />
      <List items={select.items} renderItem={renders.item} />
      <Pagination currentPage={page} pages={paginationArray} setPage={callbacks.setPagePagination} />
    </Layout>
  )
}

export default React.memo(Main);