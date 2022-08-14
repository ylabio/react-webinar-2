import BasketSimple from "../../components/basket-simple";
import List from "../../components/list";
import Layout from "../../components/layout";
import React, { useCallback } from "react";
import propTypes from 'prop-types';
import Item from "../../components/item";
import Pagination from "../../components/pagination";
import ErrorMessage from "../../components/error-message";
import useStore from "../../utils/use-store";
import useSelector from "../../utils/use-selector";

function MainPage(props) {
  const store = useStore(); 
   
  const select = useSelector(state => ({
    items: state.catalog.items,
    amount: state.basket.amount,
    sum: state.basket.sum,
    totalPages: state.paging.totalPages,
    page: state.paging.currentPage
  }));

  const callbacks = {
    // Открытие корзины
    openModalBasket: useCallback(() => store.get('modals').open('basket'), []),
    // Добавление в корзину
    addToBasket: useCallback(_id => store.get('basket').addToBasket(_id), []),
    //Изменение страницы
    changePage: useCallback((page) => store.get('paging').setPage(page), []),
  };

  const renders = {
    item: useCallback(item => <Item item={item} onAdd={callbacks.addToBasket}/>, []),
  };


  return (
    <Layout head={<h1>{props.error ? "Ошибка" : props.loading ? "Загрузка..." : "Магазин"}</h1>}>
      <BasketSimple onOpen={callbacks.openModalBasket} amount={select.amount} sum={select.sum}/>
      {
        props.error ? <ErrorMessage message={"Не удалось загрузить страницу товаров"}/> :
        <>
          <List items={select.items} renderItem={renders.item}/>
          <Pagination page={select.page} 
                      totalPages={select.totalPages} 
                      changePage={callbacks.changePage}
          />
        </>
      } 
    </Layout>
  )
}

MainPage.propTypes = {
  loading: propTypes.bool.isRequired,
  error: propTypes.bool.isRequired
}

export default React.memo(MainPage);