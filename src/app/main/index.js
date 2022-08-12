import BasketSimple from "../../components/basket-simple";
import List from "../../components/list";
import Layout from "../../components/layout";
import React, {useCallback, useEffect} from "react";
import Item from "../../components/item";
import useStore from "../../utils/use-store";
import useSelector from "../../utils/use-selector";
import Product_page from "../../components/product_page";
import PaginationBlock from "../../components/pagination-block";
import {
  BrowserRouter as Router,
  Route,
  Routes,
} from "react-router-dom";



function Main(){

  console.log('Main');

  const store = useStore();

  useEffect(() => {
    store.get('catalog').load();
  }, [])

  const select = useSelector(state => ({
    items: state.catalog.items,
    amount: state.basket.amount,
    sum: state.basket.sum,
    _id: state.item_page._id,
    item: state.item_page.item,
    count: state.catalog.count
  }));

  const callbacks = {
    // Открытие корзины
    openModalBasket: useCallback(() => store.get('modals').open('basket'), []),
    // Добавление в корзину
    addToBasket: useCallback(_id => store.get('basket').addToBasket(_id), []),
    // Добавление id элемента для запроса
    addIdForRequest: useCallback(_id => store.get('item_page').getId(_id), []),
    // обнуление состояния
    toNullForItemState: useCallback(() => store.get('item_page').toNull(), []),
    // загрузка всего списка
    toPaginate: useCallback((skip) => store.get('catalog').paginate(skip), []),
  };



  const renders = {
    item: useCallback(item => <Item item={item} addId={callbacks.addIdForRequest} onAdd={callbacks.addToBasket}/>, []),
  }

  return (
    <Layout head={<h1>{select.item.title ? select.item.title : 'Магазин'}</h1>}>
      <Routes> 
        <Route path="/" element={
          <>
            <BasketSimple 
              onOpen={callbacks.openModalBasket} 
              amount={select.amount} 
              sum={select.sum}
            />
            <List 
              items={select.items} 
              renderItem={renders.item} 
            />
            <PaginationBlock 
              count={select.count} 
              paginate={callbacks.toPaginate} 
            />
          </>
          }/> 
        <Route path={select._id} element={
          <>
            <BasketSimple 
              onOpen={callbacks.openModalBasket} 
              toNull={callbacks.toNullForItemState} 
              onAdd={callbacks.addToBasket}
              amount={select.amount} 
              sum={select.sum} 
            />,
            <Product_page 
              onAdd={callbacks.addToBasket} 
              item={select.item}
            />
          </>
        }/>
      </Routes>
    </Layout>
  )
}

export default React.memo(Main);
