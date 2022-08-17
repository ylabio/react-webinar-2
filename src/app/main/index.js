import BasketSimple from "../../components/basket-simple";
import List from "../../components/list";
import Layout from "../../components/layout";
import React, {useCallback, useEffect} from "react";
import Item from "../../components/item";
import useStore from "../../utils/use-store";
import useSelector from "../../utils/use-selector";
import Pagination from "../../components/pagination";
import lang  from "../../utils/dictionary";
import {useParams} from "react-router-dom";

function Main(){

  console.log('Main');

  const store = useStore();

  useEffect(() => {
    store.get('catalog').load();
  }, []);

  const select = useSelector(state => ({
    items: state.catalog.items,
    amount: state.basket.amount,
    sum: state.basket.sum,
    params: state.catalog.params,
    count: state.catalog.count,
  }));

  const callbacks = {
    // Открытие корзины
    openModalBasket: useCallback(() => store.get('modals').open('basket'), []),
    // Добавление в корзину
    addToBasket: useCallback(_id => store.get('basket').addToBasket(_id), []),
    // Переход по страницам
    onPaginate: useCallback(page => store.get('catalog').load({page}), []),

  };

  const renders = {
    item: useCallback(item => <Item item={item} onAdd={callbacks.addToBasket} link={`/${useParams().lang || 'ru'}/${item._id}`}/>, []),
  };
  //Пора декомпозировать)
  const options = {
    menuItems: [
      {key: 1, title: 'Главная', link: `/${useParams().lang || 'ru' }/`},
    ]
  };

  return (
    <Layout head={<h1>Магазин</h1>}>
      <BasketSimple onOpen={callbacks.openModalBasket} amount={select.amount} sum={select.sum} options={options.menuItems}/>
      <List items={select.items} renderItem={renders.item}/>
      <Pagination
        page={select.params.page}
        limit={select.params.limit}
        count={select.count}
        onChange={callbacks.onPaginate}
      />
    </Layout>
  )
}

export default React.memo(Main);
