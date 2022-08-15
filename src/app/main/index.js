import React, { useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useStore from '../../utils/use-store';
import useSelector from '../../utils/use-selector';
import BasketSimple from '../../components/basket-simple';
import List from '../../components/list';
import Layout from '../../components/layout';
import Item from '../../components/item';
import Pagination from '../../components/pagination';
import LinkToMain from '../../components/link-to-main'

function Main() {
  console.log('Main');
  const store = useStore();

  let navigate = useNavigate();

    useEffect(() => {
    store.get('catalog').load();
  }, []);

  const select = useSelector((state) => ({
    items: state.catalog.items,
    amount: state.basket.amount,
    sum: state.basket.sum,
    totalPagesCounter: state.catalog.totalPagesCounter,
    currentPage: state.catalog.currentPage,
  }));

  const callbacks = {
    // Открытие корзины
    openModalBasket: useCallback(() => store.get('modals').open('basket'), []),
    // Добавление в корзину
    addToBasket: useCallback((_id) => store.get('basket').addToBasket(_id), []),
    setPage: useCallback((page) => store.get('catalog').setPage(page), []),
  };

  const renders = {
    item: useCallback(
      (item) => <Item item={item} onAdd={callbacks.addToBasket} navigate={navigate} path={'/item'} />,
      []
    ),
  };

  return (
    <Layout head={<h1>Магазин</h1>}>
      <LinkToMain />
      <BasketSimple onOpen={callbacks.openModalBasket} amount={select.amount} sum={select.sum} />
      <List items={select.items} renderItem={renders.item} />
      <Pagination
        onSetPage={callbacks.setPage}
        currentPage={select.currentPage}
        totalPagesCounter={select.totalPagesCounter}
      />
    </Layout>
  );
}

export default React.memo(Main);
