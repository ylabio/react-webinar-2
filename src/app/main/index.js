import BasketSimple from '../../components/basket-simple';
import List from '../../components/list';
import Layout from '../../components/layout';
import React, { useCallback, useEffect } from 'react';
import Item from '../../components/item';
import useStore from '../../utils/use-store';
import useSelector from '../../utils/use-selector';
import LayoutLoader from '../layout-loader';
import Pagination from '../../components/pagination';
import Header from '../../components/header';

function Main() {
  console.log('Main');

  const store = useStore();

  const select = useSelector((state) => ({
    items: state.catalog.items,
    amount: state.basket.amount,
    sum: state.basket.sum,
    amountPages: state.catalog.amountPages,
    currentPage: state.catalog.currentPage,
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
  };

  const renders = {
    item: useCallback(
      (item) => <Item item={item} onAdd={callbacks.addToBasket} address={`/article/${item._id}`} />,
      []
    ),
  };

  return (
    <Layout head={<h1>Магазин</h1>}>
      <Header openModalBasket={callbacks.openModalBasket} amount={select.amount} sum={select.sum} />
      <LayoutLoader>
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
