import BasketSimple from '../../components/basket-simple';
import List from '../../components/list';
import Layout from '../../components/layout';
import React, { useCallback, useEffect } from 'react';
import Item from '../../components/item';
import useStore from '../../utils/use-store';
import useSelector from '../../utils/use-selector';
import Pagination from '../../components/pagination';
import { useNavigate } from 'react-router-dom';

function Main() {
  const navigate = useNavigate();
  console.log('Main');

  const store = useStore();

  const select = useSelector((state) => ({
    items: state.catalog.items,
    itemsCount: state.catalog.itemsCount,
    currentPage: state.catalog.currentPage,
    amount: state.basket.amount,
    sum: state.basket.sum,
  }));

  const callbacks = {
    // Открытие корзины
    openModalBasket: useCallback(() => store.get('modals').open('basket'), []),
    // Добавление в корзину
    addToBasket: useCallback((_id) => store.get('basket').addToBasket(_id), []),
    setCurrentPage: useCallback((page) => store.get('catalog').setCurrentPage(page), []),
    openItem: useCallback((_id) => navigate(`/article/${_id}`), []),
  };

  useEffect(() => {
    store.get('catalog').load((select.currentPage - 1) * 10);
  }, [select.currentPage]);

  const renders = {
    item: useCallback(
      (item) => <Item item={item} onAdd={callbacks.addToBasket} openItem={callbacks.openItem} />,
      [],
    ),
  };

  return (
    <Layout head={<h1>Магазин</h1>}>
      <BasketSimple onOpen={callbacks.openModalBasket} amount={select.amount} sum={select.sum} />
      <List items={select.items} renderItem={renders.item} />
      <Pagination
        style={{ float: 'right', marginRight: '15px' }}
        totalPages={Math.ceil(select.itemsCount / 10)}
        currentPage={select.currentPage}
        onChange={(page) => callbacks.setCurrentPage(page)}
        hidePreviousAndNextPageLinks={true}
        hideFirstAndLastPageLinks={true}
      />
    </Layout>
  );
}

export default React.memo(Main);
