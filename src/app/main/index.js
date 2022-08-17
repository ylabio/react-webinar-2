import BasketSimple from "../../components/basket-simple";
import List from "../../components/list";
import Layout from "../../components/layout";
import React, { useCallback, useEffect } from "react";
import Item from "../../components/item";
import useStore from "../../utils/use-store";
import useSelector from "../../utils/use-selector";
import Pagination from "../../components/pagination";
import Basket from "../basket";
import Navigation from "../../components/navigation";

function Main() {
  console.log('Main');
  const store = useStore();
  const select = useSelector(state => ({
    items: state.catalog.items,
    amount: state.basket.amount,
    sum: state.basket.sum,
    totalItems: state.catalog.totalItems,
    modal: state.modals.name,
    totalPages: state.paginationStage.totalPages,
    activePage: state.paginationStage.activePage,
  }));
  useEffect(() => {
    store.get('paginationStage').load();
  }, [])
  useEffect(() => {
    store.get('catalog').load(select.activePage - 1);
  }, [select.activePage])

  const callbacks = {
    // Открытие корзины
    openModalBasket: useCallback(() => store.get('modals').open('basket'), []),
    // Добавление в корзину
    addToBasket: useCallback(_id => store.get('basket').addToBasket(_id), []),
    // Переключение активной страницы
    correctPage: useCallback(id => store.get('paginationStage').correctPage(id), [])
  };

  const renders = {
    item: useCallback(item => <Item item={item} onAdd={callbacks.addToBasket} link={'item'} />, []),
  }

  return (
    <>
      <Layout head={<h1>Магазин</h1>}>
        <Navigation />
        <BasketSimple onOpen={callbacks.openModalBasket} amount={select.amount} sum={select.sum} />
        <List items={select.items} renderItem={renders.item} />
        <Pagination totalPages={select.totalPages} pageId={select.activePage} callback={callbacks.correctPage} />
      </Layout>
      {select.modal === 'basket' && <Basket />}
    </>
  )
}


export default React.memo(Main);
