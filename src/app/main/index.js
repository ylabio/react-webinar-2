import React, { useCallback, useEffect, useState, useMemo } from 'react';

import BasketSimple from '../../components/basket-simple';
import List from '../../components/list';
import Layout from '../../components/layout';
import Item from '../../components/item';
import Pagination from '../../components/pagination';

import useStore from '../../utils/use-store';
import useSelector from '../../utils/use-selector';
import useLanguage from '../../utils/use-language';
import Menu from '../../components/menu';

function Main() {
  console.log('Main');

  const store = useStore();
  const { content } = useLanguage();

  useEffect(() => {
    store.get('catalog').load();
  }, []);

  const select = useSelector((state) => ({
    items: state.catalog.items,
    pages: state.catalog.pages,
    amount: state.basket.amount,
    sum: state.basket.sum,
  }));

  const callbacks = {
    // Открытие корзины
    openModalBasket: useCallback(() => store.get('modals').open('basket'), []),
    // Добавление в корзину
    addToBasket: useCallback((_id) => store.get('basket').addToBasket(_id), []),
    // Изменение страницы
    changePage: useCallback((page) => {
      store.get('catalog').changePage(page);
    }, []),
  };

  const currentPage = store.get('catalog').getCurrentPage();

  const renders = {
    item: useCallback(
      (item) => (
        <Item
          item={item}
          onAdd={callbacks.addToBasket}
          content={content}
          path='/products/'
        />
      ),
      [content]
    ),
  };

  return (
    <Layout head={<h1>{content.title}</h1>}>
      <Menu content={content} />
      <BasketSimple
        content={content}
        onOpen={callbacks.openModalBasket}
        amount={select.amount}
        sum={select.sum}
      />
      <List items={select.items} renderItem={renders.item} />
      <Pagination
        totalPages={select.pages}
        changePage={callbacks.changePage}
        currentPage={currentPage}
      />
    </Layout>
  );
}

export default React.memo(Main);
