import BasketSimple from "../../components/basket-simple";
import List from "../../components/list";
import Layout from "../../components/layout";
import React, {useCallback, useEffect} from "react";
import Item from "../../components/item";
import useStore from "../../utils/use-store";
import useSelector from "../../utils/use-selector";
import Pagination from "../../components/pagination";

function Main(){
  console.log('Main');

  const store = useStore();

  const select = useSelector(state => ({
    skip: state.pagination.skip,
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
    // Сдвиг пагинации
    setSkip: useCallback(skip => store.get('pagination').setSkip(skip), [])
  };

  const renders = {
    item: useCallback(item => <Item item={item} onAdd={callbacks.addToBasket}/>, []),
  }

  useEffect(() => {
    store.get('catalog').load(select.skip);
  }, [select.skip]);

  return (
    <Layout head={<h1>Магазин</h1>}>
      <BasketSimple onOpen={callbacks.openModalBasket} amount={select.amount} sum={select.sum}/>
      <List items={select.items} renderItem={renders.item}/>
      <Pagination count={select.count} skip={select.skip} setSkip={callbacks.setSkip}/>
    </Layout>
  )
}

export default React.memo(Main);
