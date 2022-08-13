import BasketSimple from "../../components/basket-simple";
import List from "../../components/list";
import Layout from "../../components/layout";
import React, {useCallback, useEffect} from "react";
import Item from "../../components/item";
import useStore from "../../utils/use-store";
import useSelector from "../../utils/use-selector";
import Pagination from "components/pagination";
import {useSearchParams} from "react-router-dom";

function Main() {

  console.log('Main');
  const [params, setParams] = useSearchParams();
  const skip = params.get("skip") || 0;

  const store = useStore();

  useEffect(() => {
    store.get('catalog').load(skip);
  }, [params]);

  const select = useSelector(state => ({
    items: state.catalog.items,
    count: state.catalog.count,
    amount: state.basket.amount,
    sum: state.basket.sum
  }));

  const callbacks = {
    // Открытие корзины
    openModalBasket: useCallback(() => store.get('modals').open('basket'), []),
    // Добавление в корзину
    addToBasket: useCallback(_id => store.get('basket').addToBasket(_id), []),
  };

  const renders = {
    item: useCallback(item => <Item item={item} onAdd={callbacks.addToBasket}/>, []),
  };

  return (
    <Layout head={<h1>Магазин</h1>}>
      <BasketSimple onOpen={callbacks.openModalBasket} amount={select.amount} sum={select.sum}/>
      <List items={select.items} renderItem={renders.item}/>
      <Pagination count={129} limit={10}/>
    </Layout>
  );
}

export default React.memo(Main);
