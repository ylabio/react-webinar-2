import BasketSimple from "../../components/basket-simple";
import { useNavigate } from 'react-router-dom';
import routes from '../../API/routes';
import List from "../../components/list";
import Layout from "../../components/layout";
import React, {useCallback, useEffect} from "react";
import Item from "../../components/item";
import Pagination from "../../components/pagination";
import PaginationButton from "../../components/pagination-button";
import useStore from "../../utils/use-store";
import useSelector from "../../utils/use-selector";

function Main(){

  console.log('Main');

  const store = useStore();
  const navigate = useNavigate();

  useEffect(() => {
    store.get('catalog').load();
    store.get('pagination').load();
  }, [])

  const select = useSelector(state => ({
    items: state.catalog.items,
    amount: state.basket.amount,
    sum: state.basket.sum,
    itemsQuantity: state.pagination.itemsQuantity,
    itemsNuberPerPage: state.pagination.itemsNuberPerPage,
    activePage: state.pagination.activePage,
  }));

  const callbacks = {
    // Открытие корзины
    openModalBasket: useCallback(() => {
      navigate(routes.basket());
      store.get('modals').open('basket')
    }, []),
    // Добавление в корзину
    addToBasket: useCallback(_id => store.get('basket').addToBasket(_id), []),
    // Навигация по пагинации каталога
    moveToPage: useCallback(_indexNumber => {
      store.get('pagination').setActivePage(_indexNumber)
      store.get('catalog').loadPage(_indexNumber, select.itemsNuberPerPage)
    }, [select.itemsNuberPerPage, select.activePage]),
    // Просмотр информации о товаре
    showDescription: useCallback(id => {
      navigate(routes.item(id))
    }, []),
  };

  const renders = {
    item: useCallback(item => <Item item={item} onShowDescription={callbacks.showDescription} onAdd={callbacks.addToBasket}/>, []),
    paginationButton: useCallback((indexNumber, activePage) => 
    <PaginationButton 
      indexNumber={indexNumber} 
      moveToPage={callbacks.moveToPage}
      activePage={activePage} />, []),
  }

  return (
    <Layout head={<h1>Магазин</h1>}>
      <BasketSimple onOpen={callbacks.openModalBasket} amount={select.amount} sum={select.sum}/>
      <List items={select.items} renderItem={renders.item}/>
      <Pagination 
        itemsNuberPerPage={select.itemsNuberPerPage}
        totalItemsQuantity={select.itemsQuantity}
        activePage={select.activePage}
        renderItem={renders.paginationButton}/>
    </Layout>
  )
}

export default React.memo(Main);
