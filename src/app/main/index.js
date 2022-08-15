import BasketSimple from '../../components/basket-simple';
import List from '../../components/list';
import Layout from '../../components/layout';
import React, { useCallback, useEffect, useState } from 'react';
import Item from '../../components/item';
import useStore from '../../utils/use-store';
import useSelector from '../../utils/use-selector';
import LayoutLoader from '../../components/layout-loader';
import Pagination from '../../components/pagination';

function Main() {
  console.log('Main');

  const store = useStore();

  const [currentPage, setCurrentPage] = useState(1);

  const select = useSelector((state) => ({
    items: state.catalog.items,
    amount: state.basket.amount,
    sum: state.basket.sum,
    amountPages: state.catalog.amountPages,
    currentPage: state.catalog.currentPage,
  }));

  useEffect(() => {
    store.get('catalog').load(currentPage);
  }, [currentPage]);

  // console.log(currentPage);

  const callbacks = {
    // Открытие корзины
    openModalBasket: useCallback(() => store.get('modals').open('basket'), []),
    // Добавление в корзину
    addToBasket: useCallback((_id) => store.get('basket').addToBasket(_id), []),
    setCurrentPage: useCallback((page) => store.get('catalog').setCurrentPage(page), []),
  };

  const renders = {
    item: useCallback(
      (item) => <Item item={item} onAdd={callbacks.addToBasket} address={`/article/${item._id}`} />,
      []
    ),
  };

  return (
    <Layout head={<h1>Магазин</h1>}>
      <BasketSimple onOpen={callbacks.openModalBasket} amount={select.amount} sum={select.sum} />
      <LayoutLoader>
        <List items={select.items} renderItem={renders.item} />
      </LayoutLoader>
      <Pagination
        currentPage={currentPage}
        amountPages={select.amountPages}
        setCurrentPage={setCurrentPage}
      />
    </Layout>
  );
}

export default React.memo(Main);
