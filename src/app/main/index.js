import BasketSimple from "../../components/basket-simple";
import List from "../../components/list";
import Layout from "../../components/layout";
import React, { useCallback, useEffect, useState } from "react";
import Item from "../../components/item";
import useStore from "../../utils/use-store";
import useSelector from "../../utils/use-selector";
import getAmountOfPage from "../../utils/amount-pages";
import Pagination from "../../components/pagination";
import getPaginationArray from "../../utils/pagination-array";

function Main() {
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);
  const [amountBaskets, setAmountBaskets] = useState(0);
  const pagePagination = getAmountOfPage(amountBaskets, limit);
  const paginationArray = getPaginationArray(pagePagination);

  const store = useStore();

  useEffect(() => {
    store.get('catalog').load(limit, page);
    amountAllItems()
  }, [page])

  async function amountAllItems() {
    const amount = await store.get('catalog').getAmountItems();
    setAmountBaskets(amount);
  }

  const select = useSelector(state => ({
    items: state.catalog.items,
    amount: state.basket.amount,
    sum: state.basket.sum
  }));

  const callbacks = {
    // Открытие корзины
    openModalBasket: useCallback(() => store.get('modals').open('basket'), []),
    // Добавление в корзину
    addToBasket: useCallback(_id => store.get('basket').addToBasket(_id), []),
    setPagePagination: useCallback((page) => {
      setPage(page)
    })
  };

  const renders = {
    item: useCallback(item => <Item item={item} onAdd={callbacks.addToBasket} />, []),
  }

  return (
    <Layout head={<h1>Магазин</h1>}>
      <BasketSimple onOpen={callbacks.openModalBasket} amount={select.amount} sum={select.sum} />
      <List items={select.items} renderItem={renders.item} />
      <Pagination currentPage={page} pages={paginationArray} setPage={callbacks.setPagePagination}></Pagination>
    </Layout>
  )
}

export default React.memo(Main);
