import BasketSimple from "../../components/basket-simple";
import List from "../../components/list";
import Layout from "../../components/layout";
import React, {useCallback, useEffect} from "react";
import Item from "../../components/item";
import useStore from "../../utils/use-store";
import useSelector from "../../utils/use-selector";

function Main() {
  
  console.log('Main');
  
  const store = useStore();
  
  const select = useSelector(state => ({
    items: state.catalog.items,
    currentPage: state.catalog.currentPage,
    totalItems: state.catalog.totalItems,
    amount: state.basket.amount,
    sum: state.basket.sum,
  }));
  
  useEffect(() => {
    store.get('catalog').load();
  }, [select.currentPage])
  
  const callbacks = {
    // Открытие корзины
    openModalBasket: useCallback(() => store.get('modals').open('basket'), []),
    // Добавление в корзину
    addToBasket: useCallback(_id => store.get('basket').addToBasket(_id), []),
    // Переключение страницы
    switchPage: useCallback((page) => store.get('catalog').switchPage(page), [])
  };
  
  const renders = {
    item: useCallback(item => <Item item={item} onAdd={callbacks.addToBasket}/>, []),
  }
  
  return (
    <Layout head={<h1>Магазин</h1>}>
      <BasketSimple onOpen={callbacks.openModalBasket} amount={select.amount} sum={select.sum}/>
      <List items={select.items} renderItem={renders.item} paginationData={{totalItems: select.totalItems, currentPage: select.currentPage, switchPage: callbacks.switchPage}}/>
    </Layout>
  )
}

export default React.memo(Main);
