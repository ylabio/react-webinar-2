import List from '../../components/list';
import Layout from '../../components/layout';
import React, { useCallback, useEffect } from 'react';
import Item from '../../components/item';
import useStore from '../../utils/use-store';
import useSelector from '../../utils/use-selector';
import LayoutLoader from '../../components/layout-loader';
import Pagination from '../../components/pagination';
import Header from '../../components/header';
import translate from '../../utils/translate';

function Main() {
  console.log('Main');

  const store = useStore();

  const select = useSelector((state) => ({
    items: state.catalog.items,
    amount: state.basket.amount,
    sum: state.basket.sum,
    amountPages: state.catalog.amountPages,
    currentPage: state.catalog.currentPage,
    language: state.language,
    loading: state.loading,
  }));

  useEffect(() => {
    store.get('catalog').load(select.currentPage);
  }, [select.currentPage]);

  const callbacks = {
    // Открытие корзины
    openModalBasket: useCallback(() => store.get('modals').open('basket'), []),
    // Добавление в корзину
    addToBasket: useCallback((_id) => store.get('basket').addToBasket(_id), []),
    setCurrentPage: useCallback((pageNumber) => {
      store.get('catalog').setCurrentPage(pageNumber);
    }, []),
    changeLanguage: useCallback((language) => store.changeLanguage(language), []),
  };

  const renders = {
    item: useCallback(
      (item) => (
        <Item
          item={item}
          onAdd={callbacks.addToBasket}
          address={`/article/${item._id}`}
          language={select.language}
        />
      ),
      [select.language, callbacks.addToBasket]
    ),
  };

  return (
    <Layout
      head={<h1>{translate(select.language, 'shop')}</h1>}
      changeLanguage={callbacks.changeLanguage}
      language={select.language}
    >
      <Header
        openModalBasket={callbacks.openModalBasket}
        amount={select.amount}
        sum={select.sum}
        language={select.language}
      />
      <LayoutLoader loading={select.loading}>
        <List items={select.items} renderItem={renders.item} />
      </LayoutLoader>
      {select.amountPages > 1 && (
        <Pagination
          currentPage={select.currentPage}
          amountPages={select.amountPages}
          setCurrentPage={callbacks.setCurrentPage}
        />
      )}
    </Layout>
  );
}

export default React.memo(Main);
