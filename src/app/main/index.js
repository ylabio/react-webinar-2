import BasketSimple from '../../components/basket-simple';
import List from '../../components/list';
import Layout from '../../components/layout';
import React, { useCallback } from 'react';
import Item from '../../components/item';
import useStore from '../../utils/use-store';
import useSelector from '../../utils/use-selector';
import Pages from '../../components/pages';
import translator from '../../utils/translator';

function Main() {
  console.log('Main');

  const store = useStore();

  const select = useSelector((state) => ({
    items: state.catalog.items,
    count: state.catalog.count,
    amount: state.basket.amount,
    sum: state.basket.sum,
    currentPage: state.catalog.currentPage,
    currentLanguage: state.language.lang,
  }));
  const dictionary = translator(select.currentLanguage);

  const callbacks = {
    // Открытие корзины
    openModalBasket: useCallback(() => store.get('modals').open('basket'), []),
    // Добавление в корзину
    addToBasket: useCallback((_id) => store.get('basket').addToBasket(_id), []),
    // Загрузка страницы товаров
    loadPage: useCallback(
      (limit, skip) => store.get('catalog').load(limit, skip),
      []
    ),
    // Изменение страницы
    changePage: useCallback((num) => store.get('catalog').changePage(num), []),
  };

  const renders = {
    item: useCallback(
      (item) => (
        <Item
          item={item}
          onAdd={callbacks.addToBasket}
          dictionary={dictionary}
        />
      ),
      [select.currentLanguage]
    ),
  };

  return (
    <>
      <Layout head={<h1>{dictionary.store}</h1>}>
        <BasketSimple
          onOpen={callbacks.openModalBasket}
          amount={select.amount}
          sum={select.sum}
          dictionary={dictionary}
        />

        <List items={select.items} renderItem={renders.item} />

        <Pages
          count={select.count}
          load={callbacks.loadPage}
          currentPage={select.currentPage}
          changePage={callbacks.changePage}
        />
      </Layout>
    </>
  );
}

export default React.memo(Main);
