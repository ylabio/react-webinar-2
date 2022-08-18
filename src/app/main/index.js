import BasketSimple from "../../components/basket-simple";
import List from "../../components/list";
import Layout from "../../components/layout";
import NavigationPanel from '../../components/navigation-panel';
import Header from "../../components/header";
import React, {useCallback, useEffect} from "react";
import Item from "../../components/item";
import Pagination from "../../components/pagination";
import PaginationButton from "../../components/pagination-button";
import useStore from "../../utils/use-store";
import useSelector from "../../utils/use-selector";
import { uniqueId } from 'lodash';
import TextContentContext from "../../store/textcontext";

function Main(){

  console.log('Main');

  const store = useStore();

  useEffect(() => {
    store.get('catalog').load();
    store.get('catalog').load();
  }, [])

  const select = useSelector(state => ({
    items: state.catalog.items,
    amount: state.basket.amount,
    sum: state.basket.sum,
    itemsQuantity: state.catalog.itemsQuantity,
    itemsNuberPerPage: state.catalog.itemsNuberPerPage,
    activePage: state.catalog.activePage,
    locales: state.locales,
  }));

  const callbacks = {
    // Открытие корзины
    openModalBasket: useCallback(() => {
      store.get('modals').open('basket')
    }, []),
    // Добавление в корзину
    addToBasket: useCallback(_id => store.get('basket').addToBasket(_id), []),
    // Навигация по пагинации каталога
    moveToPage: useCallback(_indexNumber => {
      store.get('catalog').setActivePage(_indexNumber)
      store.get('catalog').loadPage(_indexNumber, select.itemsNuberPerPage)
    }, [select.itemsNuberPerPage, select.activePage]),
    // Просмотр информации о товаре
    showDescription: useCallback(() => store.get('modals').close(), []),
    // Смена языка
    changeLng: useCallback((lng) => store.get('locales').changeLng(lng), [])
  };

  const renders = {
    item: useCallback(item => 
      <Item 
        item={item} 
        onShowDescription={callbacks.showDescription} 
        onAdd={callbacks.addToBasket}/>, [select.locales.lng]),
    paginationButton: useCallback((indexNumber, activePage) => 
      <PaginationButton
        indexNumber={indexNumber} 
        moveToPage={callbacks.moveToPage}
        activePage={activePage}
        key={uniqueId(indexNumber)} />, []),
  }

  return (
    <TextContentContext.Provider value={select.locales[select.locales.lng]}>
      <Layout head={<Header onChangeLng={callbacks.changeLng} />}>
        <NavigationPanel />
        <BasketSimple onOpen={callbacks.openModalBasket} amount={select.amount} sum={select.sum}/>
        <List items={select.items} renderItem={renders.item}/>
        {select.itemsQuantity !== 'idle' && <Pagination 
          itemsNuberPerPage={select.itemsNuberPerPage}
          totalItemsQuantity={select.itemsQuantity}
          activePage={select.activePage}
          renderItem={renders.paginationButton}/>}
      </Layout>
    </TextContentContext.Provider>
  )
}

export default React.memo(Main);
