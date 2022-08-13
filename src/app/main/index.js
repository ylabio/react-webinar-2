import BasketSimple from "../../components/basket-simple";
import List from "../../components/list";
import Layout from "../../components/layout";
import React, {useCallback, useEffect} from "react";
import Item from "../../components/item";
import useStore from "../../utils/use-store";
import useSelector from "../../utils/use-selector";
import {config} from '../../config';
import Pagination from "../../components/pagination";
import Header from "../../components/header";
import LayoutSpinner from "../../components/layout-spinner";
import MainRoute from "../../components/main-route";
import getTranslation from "../../utils/getTranslation";
import translations from "../../shared/data/translations";

function Main(){
  const store = useStore();
  const select = useSelector(state => ({
    items: state.catalog.items,
    total: state.catalog.total,
    isFetching: state.catalog.isFetching,
    amount: state.basket.amount,
    sum: state.basket.sum,
    currentPage: state.catalog.currentPage,
    language: state.language.language,
  }));

  useEffect(() => {
    const skip = (select.currentPage - 1) * config.API_LIMIT;
    store.get('catalog').getGoods(skip);
  }, [select.language])

  const callbacks = {
    // Открытие корзины
    openModalBasket: useCallback(() => store.get('modals').open('basket'), []),
    // Добавление в корзину
    addToBasket: useCallback(_id => store.get('basket').addToBasket(_id), []),
    changeLanguage: useCallback(lang => store.get('language').changeLanguage(lang), []),
    changePage: useCallback((page) => {
      if (!select.isFetching) {
        if (page !== select.currentPage && page !== '...') {
          const skip = (page - 1) * config.API_LIMIT;
          store.get('catalog').getGoods(skip);
          store.get('catalog').changeCurrentPage(page);
        }
      }
    }, [select.currentPage, select.isFetching]),
  };

  const renders = {
    item: useCallback(item => <Item 
      item={item} 
      onAdd={callbacks.addToBasket}
      lang={select.language}
      to={config.routes.product}
      translationData={{
        add: getTranslation(
          select.language,
          translations.html_elements.button.add
        ),
      }}
    />, [select.language]),
  }

  return (
    <Layout 
      head={
        <Header 
          title={getTranslation(
            select.language,
            translations.components.Header.store,
          )}
          changeLanguage={callbacks.changeLanguage} 
          lang={select.language}
      />}
      basket={
        <BasketSimple 
          onOpen={callbacks.openModalBasket} 
          amount={select.amount} 
          sum={select.sum}
          lang={select.language}
          traslationData={{
            inCart: getTranslation(
              select.language,
              translations.components.BasketSimple.in_cart
            ),
            empty: getTranslation(
              select.language,
              translations.components.BasketSimple.empty
            ),
            go_to: getTranslation(
              select.language,
              translations.html_elements.button.go_to
            ),
          }}
        />
      }
      nav={
        <MainRoute 
          to={config.routes.home_page} 
          translationData={{
            name: getTranslation(
              select.language,
              translations.components.MainRoute.main
            ),
          }}
        />
      }
    >
      <LayoutSpinner
        isFetching={select.isFetching}
        color='orange'
      >
        <List 
          items={select.items} 
          renderItem={renders.item}
        />
      </LayoutSpinner>
      
      <Pagination
        total={select.total} 
        currentPage={select.currentPage}
        changePage={callbacks.changePage}
        limit={config.api.limit}
      />

    </Layout>
  )
}

export default React.memo(Main);
