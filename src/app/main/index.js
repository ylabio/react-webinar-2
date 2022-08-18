import BasketSimple from "../../components/basket-simple";
import List from "../../components/list";
import Layout from "../../components/layout";
import React, {useCallback, useState, useEffect} from "react";
import { useSearchParams } from "react-router-dom";
import Item from "../../components/item";
import PaginationBar from "../../components/pagination";
import useStore from "../../utils/use-store";
import useSelector from "../../utils/use-selector";
import ToHomePage from "../../components/Menu";
import Header from "../../components/header/header";


function Main(){
  console.log('Main');

  const [ params ] = useSearchParams();
  
  const store = useStore();

  useEffect(() => {
    store.get('catalog').load(+ params.get('page') || 1);
  }, [params.get('page')])

  const callbacks = {
    // Открытие корзины
    openModalBasket: useCallback(() => store.get('modals').open('basket'), []),
    // Добавление в корзину
    addToBasket: useCallback(_id => store.get('basket').addToBasket(_id), []),
    //загрузка контента на страницу
    loadNewData: useCallback(pageNum => store.get('catalog').load(pageNum), []),
    //
    getProduct: useCallback(_id => store.get('propduct').getProduct(_id))
  };

  const select = useSelector(state => ({//каждый раз при рендере достаем паарметры приложения из состояния
    amount: state.basket.amount,
    sum: state.basket.sum,
    items: state.catalog.items,
    currentPage: state.catalog.currentPageNumber,
    pagination: state.catalog.pagination
  }));

  const renders = {
    item: useCallback(item => <Item item={item} onAdd={callbacks.addToBasket} link={'/articles/' + item._id}/>, []),
  }

  return (
    <> {!!select.items 
    ?<Layout head={<h1>Магазин</h1>}>
      <Header>
        <ToHomePage />
        <BasketSimple amount={select.amount} sum={select.sum} onOpenModal={callbacks.openModalBasket}/>
      </Header>    
      <List items={select.items} renderItem={renders.item}/>
        <PaginationBar 
          pagination={select.pagination.paginationArray}
          selected={select.currentPage}
          onChangePage={callbacks.loadNewData}/>
      </Layout> 
      : <>load</>
    }
    </>
  )
}

export default React.memo(Main);
