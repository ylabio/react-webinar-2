import React, { useCallback, useEffect, useState } from 'react';

import BasketSimple from '../../components/basket-simple';
import List from '../../components/list';
import Layout from '../../components/layout';
import Item from '../../components/item';
import Pagination from '../../components/pagination';

import useStore from '../../utils/use-store';
import useSelector from '../../utils/use-selector';

import useLanguage from '../../utils/use-language';

function Main() {
  console.log('Main');

  const store = useStore();

  // получение контекста для перевода слов
  const { content } = useLanguage();

  // состояния для limit и skip из АПИ
  const [limit, setLimit] = useState(10);
  const [skip, setSkip] = useState(0);

  useEffect(() => {
    store.get('catalog').load(limit, skip);
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
    changePage: useCallback((skipAmount) => {
      store.get('catalog').load(limit, skipAmount);
      setSkip(skipAmount);
    }, []),
  };

  const currentPage = (skip + limit) / limit;

  const renders = {
    item: useCallback(
      (item) => <Item item={item} onAdd={callbacks.addToBasket} />,
      []
    ),
  };

  return (
    <Layout head={<h1>{content.title}</h1>}>
      <BasketSimple
        onOpen={callbacks.openModalBasket}
        amount={select.amount}
        sum={select.sum}
      />
      <List items={select.items} renderItem={renders.item} />
      <Pagination
        totalPages={select.pages}
        changePage={callbacks.changePage}
        currentPage={currentPage}
        limit={limit}
      />
    </Layout>
  );
}

export default React.memo(Main);
