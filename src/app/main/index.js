import BasketSimple from "../../components/basket-simple";
import List from "../../components/list";
import Layout from "../../components/layout";
import Pages from "../../components/pages";
import TextField from "../../components/text-field";
import React, {useCallback, useEffect} from "react";
import Item from "../../components/item";
import useStore from "../../utils/use-store";
import useSelector from "../../utils/use-selector";

function Main(){

  console.log('Main');

  const store = useStore();

  const select = useSelector(state => ({
    items: state.catalog.items,
    count: state.catalog.count,
    limit: state.catalog.limit,
    skip: state.catalog.skip,
    selected: state.catalog.selected,
    amount: state.basket.amount,
    sum: state.basket.sum
  }));

  useEffect(() => {
    store.get('catalog').load(); 
  }, [select.limit, select.skip])

  const callbacks = {
    // Открытие корзины
    openModalBasket: useCallback(() => store.get('modals').open('basket'), []),
    // Добавление в корзину
    addToBasket: useCallback(_id => store.get('basket').addToBasket(_id), []),
    onClick: useCallback(obj => store.get('catalog').setSkip(obj), []),
    onChange: useCallback(num => num && store.get('catalog').setLimit(num), []),
  };

  const renders = {
    item: useCallback(item => <Item item={item} onAdd={callbacks.addToBasket}/>, []),
  }

  return (
    <Layout head={<h1>Магазин</h1>}>
      <BasketSimple onOpen={callbacks.openModalBasket} amount={select.amount} sum={select.sum}/>
      <List items={select.items} renderItem={renders.item}/>
      <TextField limit={select.limit} count={select.count} onChange={callbacks.onChange} />
      <Pages limit={select.limit} count={select.count} selected={select.selected} onClick={callbacks.onClick}/>
    </Layout>
  )
}

export default React.memo(Main);
