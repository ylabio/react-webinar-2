import BasketSimple from '../../components/basket-simple';
import List from '../../components/list';
import Layout from '../../components/layout';
import React, {useCallback, useEffect} from 'react';
import Item from '../../components/item';
import useStore from '../../utils/use-store';
import useSelector from '../../utils/use-selector';
import Paginator from '../../components/paginator';

function Main() {
  console.log('Main');

  const store = useStore();

  const select = useSelector(state => ({
    items: state.catalog.items,
    amount: state.basket.amount,
    sum: state.basket.sum,
    currentPage: state.pagination.currentPage,
    totalItems: state.pagination.totalItems
  }));

  useEffect(() => {
    store.get('catalog').loadWithPagination();
  }, [select.currentPage]);

  const callbacks = {
    // Открытие корзины
    openModalBasket: useCallback(() => store.get('modals').open('basket'), []),
    // Добавление в корзину
    addToBasket: useCallback(_id => store.get('basket').addToBasket(_id), []),
    // Назначение текущей страницы
    setCurrentPage: useCallback(
      pageNumber => store.get('pagination').setCurrentPage(pageNumber),
      []
    )
  };

  const renders = {
    item: useCallback(
      item => <Item item={item} onAdd={callbacks.addToBasket} />,
      []
    )
  };

  return (
    <Layout head={<h1>Магазин</h1>}>
      <BasketSimple
        onOpen={callbacks.openModalBasket}
        amount={select.amount}
        sum={select.sum}
      />

      <List items={select.items} renderItem={renders.item} />
      <Paginator
        currentPage={select.currentPage}
        totalItems={select.totalItems}
        onPageClick={callbacks.setCurrentPage}
      />
    </Layout>
  );
}

export default React.memo(Main);
