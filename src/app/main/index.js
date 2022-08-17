import BasketSimple from '../../components/basket-simple';
import List from '../../components/list';
import Layout from '../../components/layout';
import React, { useCallback, useEffect } from 'react';
import Item from '../../components/item';
import useStore from '../../utils/use-store';
import useSelector from '../../utils/use-selector';
import Pagination from '../../components/pagination';
import Preloader from '../../components/preloader';
import Wrapper from '../../components/wrapper';
import Menu from '../../components/menu';

function Main() {
  console.log('Main');

  const store = useStore();

  const select = useSelector(state => ({
    items: state.catalog.items,
    count: state.catalog.count,
    limit: state.catalog.limit,
    skip: state.catalog.skip,
    currentPage: state.catalog.currentPage,
    pages: state.catalog.pages,
    amount: state.basket.amount,
    sum: state.basket.sum,
  }));

  useEffect(() => {
    store.get('catalog').load(select.limit, select.skip);
  }, [select.skip]);

  const callbacks = {
    // Открытие корзины
    openModalBasket: useCallback(() => store.get('modals').open('basket'), []),
    // Добавление в корзину
    addToBasket: useCallback(_id => store.get('basket').addToBasket(_id), []),
    // Установка пагинации
    setPagination: useCallback(
      page => store.get('catalog').setPagination(page),
      []
    ),
    // Установка начального массива страниц для пагинации
    setInitialPages: useCallback(
      () => store.get('catalog').setInitialPages(),
      []
    ),
  };

  const renders = {
    item: useCallback(
      item => (
        <Item
          item={item}
          itemLink={`article/${item._id}`}
          onAdd={callbacks.addToBasket}
        />
      ),
      []
    ),
  };

  return (
    <Layout head={<h1>Магазин</h1>}>
      <Wrapper>
        <Menu />
        <BasketSimple
          onOpen={callbacks.openModalBasket}
          amount={select.amount}
          sum={select.sum}
        />
      </Wrapper>

      {select.items.length ? (
        <List items={select.items} renderItem={renders.item} />
      ) : (
        <Preloader />
      )}
      {select.count > select.limit && (
        <Pagination
          setInitialPages={callbacks.setInitialPages}
          setPagination={callbacks.setPagination}
          currentPage={select.currentPage}
          pages={select.pages}
        />
      )}
    </Layout>
  );
}

export default React.memo(Main);
