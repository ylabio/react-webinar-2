import BasketSimple from "../../components/basket-simple";
import List from "../../components/list";
import Layout from "../../components/layout";
import React, {useCallback, useEffect, useMemo} from "react";
import Item from "../../components/item";
import useStore from "../../utils/use-store";
import useSelector from "../../utils/use-selector";
import Menu from "../../components/menu";
import LayoutFlex from "../../components/layout-flex";
import Pagination from "../../components/pagination";
import Spinner from "../../components/spinner";

function Main() {
  const store = useStore();

  useEffect(() => {
    store.get('catalog').setParams({page: 1});
  }, [])

  const select = useSelector(state => ({
    items: state.catalog.items,
    page: state.catalog.params.page,
    limit: state.catalog.params.limit,
    count: state.catalog.count,
    amount: state.basket.amount,
    sum: state.basket.sum,
    waiting: state.catalog.waiting
  }));

  const callbacks = {
    // Открытие корзины
    openModalBasket: useCallback(() => store.get('modals').open('basket'), []),
    // Добавление в корзину
    addToBasket: useCallback(_id => store.get('basket').addToBasket(_id), []),
    // Пагианция
    onPaginate: useCallback(page => store.get('catalog').setParams({page}), []),
  };

  const renders = {
    item: useCallback(item => (
      <Item item={item} onAdd={callbacks.addToBasket} link={`/articles/${item._id}`}/>
    ), []),
  }

  const options = {
    menu: useMemo(() => ([
      {key: 1, title: 'Главная', link: '/'},
    ]), [])
  }

  return (
    <Layout head={<h1>Магазин</h1>}>
      <LayoutFlex flex="between">
        <Menu items={options.menu}/>
        <BasketSimple onOpen={callbacks.openModalBasket} amount={select.amount} sum={select.sum}/>
      </LayoutFlex>
      <Spinner active={select.waiting}>
        <List items={select.items} renderItem={renders.item}/>
        <Pagination count={select.count} page={select.page} limit={select.limit} onChange={callbacks.onPaginate}/>
      </Spinner>
    </Layout>
  )
}

export default React.memo(Main);
