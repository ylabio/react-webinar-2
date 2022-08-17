import BasketSimple from '../../components/basket-simple';
import List from '../../components/list';
import Layout from '../../components/layout';
import React, { useCallback, useEffect } from 'react';
import Item from '../../components/item';
import useStore from '../../utils/use-store';
import useSelector from '../../utils/use-selector';
import Pagination from '../../components/pagination';
import NavBar from '../../components/navbar';

function Main() {
  console.log('Main');

  const store = useStore();

  const select = useSelector((state) => ({
    items: state.catalog.items,
    amount: state.basket.amount,
    sum: state.basket.sum,
    page: state.catalog.page,
    contentPerPage: state.catalog.contentPerPage,
    itemCount: state.catalog.itemCount,
    pageCount: state.catalog.pageCount,
  }));

  useEffect(() => {
    store.get('catalog').load(select.contentPerPage, select.page);
  }, [select?.page]);

  const callbacks = {
    // Открытие корзины
    openModalBasket: useCallback(() => store.get('modals').open('basket'), []),
    // Добавление в корзину
    addToBasket: useCallback((_id) => store.get('basket').addToBasket(_id), []),
    // Переход на другую страницу по пагинации
    onChangePage: useCallback((page) => store.get('catalog').setPage(page), []),
  };

  const renders = {
    item: useCallback(
      (item) => (
        <Item
          item={item}
          onAdd={callbacks.addToBasket}
          route={`article/${item._id}`}
        />
      ),
      []
    ),
  };

  return (
    <Layout head={<h1>Магазин</h1>}>
      <BasketSimple
        onOpen={callbacks.openModalBasket}
        amount={select.amount}
        sum={select.sum}
      >
        <NavBar />
      </BasketSimple>
      <List items={select.items} renderItem={renders.item} />
      <Pagination
        totalPages={select.pageCount}
        currentPage={select.page}
        onChange={callbacks.onChangePage}
      />
    </Layout>
  );
}

export default React.memo(Main);
