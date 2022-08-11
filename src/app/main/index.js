import {cn as bem} from '@bem-react/classname';
import React, {useCallback, useEffect} from 'react';
import BasketSimple from '../../components/basket-simple';
import Item from '../../components/item';
import Layout from '../../components/layout';
import List from '../../components/list';
import Pagination from '../../components/pagination';
import useSelector from '../../utils/use-selector';
import useStore from '../../utils/use-store';
import './style.css';

function Main() {
  console.log('Main');
  const cn = bem('Main');

  const store = useStore();

  const select = useSelector(state => ({
    items: state.catalog.items,
    amount: state.basket.amount,
    sum: state.basket.sum,
    page: state.catalog.page,
    limit: state.catalog.pageLimit,
    pagesCount: state.catalog.pagesCount
  }));

  useEffect(() => {
    store.get('catalog').load(select.page, select.limit);
  }, [select.page]);

  const callbacks = {
    // Открытие корзины
    openModalBasket: useCallback(() => store.get('modals').open('basket'), []),
    // Добавление в корзину
    addToBasket: useCallback(_id => store.get('basket').addToBasket(_id), []),
    setPage: useCallback(page => store.get('catalog').setPage(page), [])
  };

  const renders = {
    item: useCallback(item => <Item item={item} onAdd={callbacks.addToBasket} />, [])
  };

  return (
    <Layout head={<h1>Магазин</h1>}>
      <BasketSimple onOpen={callbacks.openModalBasket} amount={select.amount} sum={select.sum} />
      <List items={select.items} renderItem={renders.item} />
      <Pagination
        className={cn('pagination')}
        total={select.pagesCount}
        active={select.page}
        onChange={callbacks.setPage}
      />
    </Layout>
  );
}

export default React.memo(Main);
