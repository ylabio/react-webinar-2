import BasketSimple from "../../components/basket-simple";
import List from "../../components/list";
import Layout from "../../components/layout";
import React, { useCallback, useRef } from "react";
import propTypes from 'prop-types';
import Item from "../../components/item";
import Pagination from "../../components/pagination";
import ErrorMessage from "../../components/error-message";
import useStore from "../../utils/use-store";
import useSelector from "../../utils/use-selector";
import localization from "./localization";

function MainPage(props) {
  const store = useStore(); 
   
  const select = useSelector(state => ({
    items: state.catalog.items,
    amount: state.basket.amount,
    sum: state.basket.sum,
    totalPages: state.paging.totalPages,
    page: state.paging.currentPage,
    lang: state.localization.lang
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
    <Layout head={<h1>{props.error ? localization[select.lang].headError : 
                       props.loading ? localization[select.lang].headLoad : 
                       localization[select.lang].headDefault}
                  </h1>}
    >
      <BasketSimple onOpen={callbacks.openModalBasket} amount={select.amount} sum={select.sum}/>
      {
        props.error ? <ErrorMessage message={localization[select.lang].errorMessage}/> :
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